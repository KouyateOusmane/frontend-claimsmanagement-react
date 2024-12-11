import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ViewClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get('/insureds/123/claims');
        setClaims(response.data);
      } catch (error) {
        alert('Erreur lors du chargement des réclamations : ' + error.response.data.message);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Vos réclamations</h2>
      <ul className="list-group mt-4">
        {claims.map((claim) => (
          <li key={claim.id} className="list-group-item">
            <p><strong>Type :</strong> {claim.type}</p>
            <p><strong>Description :</strong> {claim.description}</p>
            <p><strong>Date :</strong> {claim.date}</p>
            <p><strong>Montant estimé :</strong> {claim.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewClaims;