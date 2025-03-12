import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import AuthForm from '../components/Auth/AuthForm.jsx'; // Importar el nuevo componente

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { login: authLogin } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pwd) {
      setError("Fill the fields");
      return;
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
      <AuthForm 
        onSubmit={handleSubmit} 
        email={email} 
        setEmail={setEmail} 
        pwd={pwd} 
        setPwd={setPwd} 
        isRegister={false}
        error={error}
      />
    </>
  );
};

export default Login;