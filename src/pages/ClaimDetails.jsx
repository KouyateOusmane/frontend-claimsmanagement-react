import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importation de useNavigate
import api from '../api/api';

const ClaimDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialisation du hook useNavigate
  const [claim, setClaim] = useState(null);

  // Fonction pour revenir à la liste des réclamations
  const handleBack = () => {
    navigate('/view-claims'); // Redirige vers la liste des réclamations
  };

  // Fonction pour traduire les statuts en français
  const getStatusLabel = (status) => {
    const statusLabels = {
      0: 'Soumis',
      1: 'En cours de révision',
      2: 'Approuvé',
      3: 'Rejeté',
    };
    return statusLabels[status] || 'Inconnu';
  };

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await api.get(`/claims/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setClaim(response.data);
      } catch (error) {
        alert(
          'Erreur lors de la récupération de la réclamation : ' +
            error.response?.data?.message
        );
      }
    };

    fetchClaim();
  }, [id]);

  if (!claim)
    return <p className="text-center mt-5">⏳ Chargement des détails...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white text-center">
          <h3>Détails de la réclamation</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>📋 Type :</strong> {claim.claimType}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>📅 Date de l'incident :</strong>{' '}
                {new Date(claim.incidentDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>🛠 État :</strong> {getStatusLabel(claim.status)}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>💰 Montant estimé :</strong> {claim.estimatedAmount} $
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>
                <strong>📝 Description :</strong>
              </p>
              <p className="border rounded p-3 bg-light">
                {claim.incidentDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer text-end">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
