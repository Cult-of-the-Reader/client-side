import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { login: authLogin } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pwd) {
      setError("Fill the fields")
      return
    }

    try {
      const response = await api.login({ email, pwd });
      if (response.token) {
        authLogin(response.token);
        navigate("/");
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}

    </>
  );
};

export default Login;
