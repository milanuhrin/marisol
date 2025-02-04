import React, { useEffect } from "react";

const cognitoDomain = "https://us-east-17ev5jsggd.auth.us-east-1.amazoncognito.com";
const clientId = "2lsi9hdb7i9oet476clprm1vqe";
const redirectUri = "https://www.marisol.sk";

const Login: React.FC = () => {
  useEffect(() => {
    window.location.href = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=email+openid+phone&redirect_uri=${redirectUri}`;
  }, []);

  return <p>Presmerovávame vás na prihlasovaciu stránku...</p>;
};

export default Login;