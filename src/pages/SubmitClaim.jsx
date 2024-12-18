import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const SubmitClaim = () => {
  const [claim, setClaim] = useState({
    type: '',
    description: '',
    date: '',
    amount: '',
    documentUrl: '',
  });
  const [error, setError] = useState(''); // État pour gérer les erreurs de validation
  const navigate = useNavigate();
  const insuredId = localStorage.getItem('userId'); // Récupération de l'ID utilisateur

  const validateForm = () => {
    if (!claim.type || !claim.description || !claim.date || !claim.amount || !claim.documentUrl) {
      return "Tous les champs doivent être remplis.";
    }
    if (isNaN(parseFloat(claim.amount)) || parseFloat(claim.amount) <= 0) {
      return "Le montant estimé doit être un nombre positif.";
    }
    if (!/^(http|https):\/\/[^ "]+$/.test(claim.documentUrl)) {
      return "L'URL du document doit être valide.";
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        insuredId: parseInt(insuredId, 10),
        claimType: claim.type,
        incidentDescription: claim.description,
        incidentDate: claim.date,
        estimatedAmount: parseFloat(claim.amount),
        documentUrls: [claim.documentUrl],
      };

      await api.post('/claims', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      navigate('/claim-submitted'); // Redirection vers la page de confirmation
    } catch (error) {
      setError('Erreur lors de la soumission : ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Soumettre une réclamation</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Type de sinistre</label>
          <select
            className="form-select"
            value={claim.type}
            onChange={(e) => setClaim({ ...claim, type: e.target.value })}
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
            placeholder="Décrivez l'incident"
            value={claim.description}
            onChange={(e) => setClaim({ ...claim, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={claim.date}
            onChange={(e) => setClaim({ ...claim, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant estimé</label>
          <input
            type="number"
            className="form-control"
            placeholder="Entrez le montant estimé"
            value={claim.amount}
            onChange={(e) => setClaim({ ...claim, amount: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL du document</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez l'URL du document"
            value={claim.documentUrl}
            onChange={(e) => setClaim({ ...claim, documentUrl: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default SubmitClaim;
