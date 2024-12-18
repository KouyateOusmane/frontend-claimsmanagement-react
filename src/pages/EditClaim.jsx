import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const EditClaim = () => {
  const { id } = useParams(); // Récupération de l'ID depuis l'URL
  const navigate = useNavigate();

  const [claim, setClaim] = useState({
    claimType: '',
    incidentDescription: '',
    incidentDate: '',
    estimatedAmount: '',
    documentUrls: [''],
  });

  const [error, setError] = useState('');

  // Récupération des détails de la réclamation
  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await api.get(`/claims/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setClaim(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      }
    };

    fetchClaim();
  }, [id]);

  // Soumission des modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/claims/${id}`, claim, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate(`/view-claims/${id}`); // Redirige vers les détails de la réclamation
    } catch (error) {
      setError("Erreur lors de la mise à jour de la réclamation.");
    }
  };

  // Gestion du bouton Annuler
  const handleCancel = () => {
    navigate('/view-claims'); // Redirige vers la liste des réclamations
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Modifier la réclamation</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Type de sinistre</label>
          <select
            className="form-select"
            value={claim.claimType}
            onChange={(e) => setClaim({ ...claim, claimType: e.target.value })}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="Automobile">Automobile</option>
            <option value="Habitation">Habitation</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={claim.incidentDescription}
            onChange={(e) => setClaim({ ...claim, incidentDescription: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={claim.incidentDate}
            onChange={(e) => setClaim({ ...claim, incidentDate: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant estimé</label>
          <input
            type="number"
            className="form-control"
            value={claim.estimatedAmount}
            onChange={(e) => setClaim({ ...claim, estimatedAmount: e.target.value })}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClaim;
