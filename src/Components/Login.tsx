import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

const isBrowser = typeof window !== "undefined"; // Check if window exists
const poolData = {
  UserPoolId: "us-east-1_7ev5jSGGd",
  ClientId: "2lsi9hdb7i9oet476clprm1vqe",
};

const userPool = new CognitoUserPool(poolData);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = isBrowser ? useNavigate() : () => {}; // Prevent useNavigate on SSR

  const handleLogin = () => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        localStorage.setItem("token", session.getIdToken().getJwtToken());
        navigate("/admin");
      },
      onFailure: (err) => {
        console.error("Login Error:", err);
        setError(`Nesprávne prihlasovacie údaje: ${err.message}`);
      },
      newPasswordRequired: (userAttributes) => {
        // ❌ Remove attributes that cannot be modified
        delete userAttributes.email_verified;
    
        // ✅ Ask the user for a new password
        const newPassword = prompt("Zadajte nové heslo:");
        if (!newPassword) return;
    
        // ✅ Send new password
        user.completeNewPasswordChallenge(newPassword, userAttributes, {
          onSuccess: (session) => {
            localStorage.setItem("token", session.getIdToken().getJwtToken());
            navigate("/admin");
          },
          onFailure: (err) => {
            console.error("New Password Error:", err);
            setError(`Chyba pri zmene hesla: ${err.message}`);
          },
        });
      },
    });
  };

  return (
    <div>
      <h2>Prihlásenie</h2>
      {error && <p>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Prihlásiť</button>
    </div>
  );
};

export default Login;