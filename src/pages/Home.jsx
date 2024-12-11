import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Bienvenue sur le portail des réclamations d'assurance</h1>
      <p>Soumettez et suivez vos réclamations rapidement et facilement.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Se connecter</Link>
        <Link to="/signup" className="btn btn-secondary mx-2">Créer un compte</Link>
      </div>
    </div>
  );
};

export default Home;
