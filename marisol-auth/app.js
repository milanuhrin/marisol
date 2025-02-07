const express = require("express");
const session = require("express-session");
const { Issuer, generators } = require("openid-client");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(
  session({
    secret: "some_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

let client;

// 🔹 Initialize AWS Cognito OpenID Client
async function initializeClient() {
  const issuer = await Issuer.discover(
    "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_qClQQzLQU"
  );

  client = new issuer.Client({
    client_id: "3ed48asa9s27al7vfvphicod47",
    client_secret: "<client_secret>", // Replace with your actual client secret
    redirect_uris: ["https://marisol.sk/callback"],
    response_types: ["code"],
  });
}

initializeClient().catch(console.error);

// 🔹 Middleware to check authentication
const checkAuth = (req, res, next) => {
  if (!req.session.userInfo) {
    req.isAuthenticated = false;
  } else {
    req.isAuthenticated = true;
  }
  next();
};

// 🔹 Home Route
app.get("/", checkAuth, (req, res) => {
  res.render("home", {
    isAuthenticated: req.isAuthenticated,
    userInfo: req.session.userInfo,
  });
});

// 🔹 Login Route (Redirect to AWS Cognito)
app.get("/login", (req, res) => {
  const nonce = generators.nonce();
  const state = generators.state();

  req.session.nonce = nonce;
  req.session.state = state;

  const authUrl = client.authorizationUrl({
    scope: "openid email profile",
    state: state,
    nonce: nonce,
  });

  res.redirect(authUrl);
});

// 🔹 Callback Route (Handles AWS Cognito Response)
app.get("/callback", async (req, res) => {
  try {
    const params = client.callbackParams(req);
    const tokenSet = await client.callback("https://marisol.sk/callback", params, {
      nonce: req.session.nonce,
      state: req.session.state,
    });

    const userInfo = await client.userinfo(tokenSet.access_token);
    req.session.userInfo = userInfo;

    res.redirect("/admin");
  } catch (err) {
    console.error("Callback error:", err);
    res.redirect("/");
  }
});

// 🔹 Admin Panel (Protected)
app.get("/admin", checkAuth, (req, res) => {
  if (!req.isAuthenticated) {
    return res.redirect("/login");
  }

  res.render("admin", { userInfo: req.session.userInfo });
});

// 🔹 Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy();
  const logoutUrl = `https://<your-cognito-domain>/logout?client_id=3ed48asa9s27al7vfvphicod47&logout_uri=https://marisol.sk`;
  res.redirect(logoutUrl);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));