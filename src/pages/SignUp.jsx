import React, { useState } from 'react';
import api from '../api/api';

const SignUp = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', phone: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/insureds/register', user);
      setMessage({ text: 'Compte créé avec succès !', type: 'success' });
      setUser({ name: '', email: '', password: '', phone: '' }); // Réinitialisation du formulaire
    } catch (error) {
      setMessage({ text: 'Erreur lors de la création du compte : ' + error.response.data.message, type: 'danger' });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Créer un compte</h2>
      {message.text && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre nom"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Entrez votre email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre numéro de téléphone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Créer un compte</button>
      </form>
      <p className="text-center mt-3">
        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </div>
  );
};

export default SignUp;
