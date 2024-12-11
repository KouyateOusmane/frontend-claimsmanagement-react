import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/insureds/login', credentials);
      navigate('/view-claims');
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion : ' + error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Se connecter</h2>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Entrez votre email"
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Se connecter</button>
      </form>
      <p className="text-center mt-3">
        Pas encore de compte ? <a href="/signup">Créer un compte</a>
      </p>
    </div>
  );
};

export default Login;
