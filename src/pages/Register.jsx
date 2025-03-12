import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm.jsx';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !pwd) {
      setError("Fill the fields");
      return;
    }

    try {
      const response = await api.register({ username, email, pwd });
      if (response.message) {
        navigate('/login');
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
        username={username} 
        setUsername={setUsername} 
        email={email} 
        setEmail={setEmail} 
        pwd={pwd} 
        setPwd={setPwd} 
        isRegister={true}
        error={error}
      />
    </>
  );
};

export default Register;