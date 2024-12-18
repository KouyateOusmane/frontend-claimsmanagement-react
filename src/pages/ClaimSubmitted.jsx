import React from 'react';
import { Link } from 'react-router-dom';

const ClaimSubmitted = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-success">🎉 Félicitations !</h2>
          <p>Votre réclamation a été soumise avec succès.</p>
          <p>Nous vous contacterons prochainement si des informations supplémentaires sont nécessaires.</p>
          <Link to="/view-claims" className="btn btn-primary mt-3">Voir vos réclamations</Link>
        </div>
      </div>
    </div>
  );
};

export default ClaimSubmitted;
