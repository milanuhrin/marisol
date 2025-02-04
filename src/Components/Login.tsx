import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const poolData = {
  UserPoolId: "64a874a8-00f1-704a-50eb-370265b7b42a",
  ClientId: "6kr43hlcce49mfa1bt7306c54g"
};

const userPool = new CognitoUserPool(poolData);

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

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
        setError("Nesprávne prihlasovacie údaje");
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