import React, { useEffect } from 'react';
import './AuthForm.css';

const AuthForm = ({ onSubmit, username, setUsername, email, setEmail, pwd, setPwd, isRegister, error }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="auth-form-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2 className="auth-title">{isRegister ? 'Register' : 'Login'}</h2>
        {isRegister && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="auth-input"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">{isRegister ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
};

export default AuthForm; 