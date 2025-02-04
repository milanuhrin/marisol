import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

const poolData = {
  UserPoolId: "us-east-1_7ev5jSGGd",
  ClientId: "2lsi9hdb7i9oet476clprm1vqe",
};

const userPool = new CognitoUserPool(poolData);

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 🛠️ Fix: Use navigate only in the browser
  const navigate = typeof window !== "undefined" ? useNavigate() : null;

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
        setError("✅ Prihlásenie úspešné!");

        setTimeout(() => {
          if (navigate) {
            navigate("/admin"); // Works in the browser
          } else {
            window.location.href = "/admin"; // Works in Gatsby SSR
          }
        }, 2000);
      },
      onFailure: (err) => {
        console.error("Login Error:", err);
        setError(`Nesprávne prihlasovacie údaje: ${err.message}`);
      },
      newPasswordRequired: (userAttributes) => {
        delete userAttributes.email; // Fix for Cognito email error
        delete userAttributes.email_verified;

        const newPassword = prompt("Zadajte nové heslo:");
        if (!newPassword) return;

        user.completeNewPasswordChallenge(newPassword, userAttributes, {
          onSuccess: (session) => {
            localStorage.setItem("token", session.getIdToken().getJwtToken());
            if (navigate) {
              navigate("/admin");
            } else {
              window.location.href = "/admin";
            }
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Prihlásenie</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            placeholder="Zadajte email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Heslo</label>
          <input 
            type="password" 
            placeholder="Zadajte heslo" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Prihlásiť
        </button>
      </div>
    </div>
  );
};

export default Login;