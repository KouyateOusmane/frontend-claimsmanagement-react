import React, { useState } from 'react';
import api from '../api/api';

const SubmitClaim = () => {
  const [claim, setClaim] = useState({ type: '', description: '', date: '', amount: '', documents: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('type', claim.type);
      formData.append('description', claim.description);
      formData.append('date', claim.date);
      formData.append('amount', claim.amount);
      claim.documents.forEach((file) => formData.append('documents', file));

      await api.post(`/claims`, formData);
      alert('Réclamation soumise avec succès');
    } catch (error) {
      alert('Erreur lors de la soumission : ' + error.response.data.message);
    }
  };

  const handleFileChange = (e) => {
    setClaim({ ...claim, documents: [...e.target.files] });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Soumettre une réclamation</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Type de sinistre</label>
          <select
            className="form-select"
            onChange={(e) => setClaim({ ...claim, type: e.target.value })}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="automobile">Automobile</option>
            <option value="habitation">Habitation</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Décrivez l'incident"
            onChange={(e) => setClaim({ ...claim, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setClaim({ ...claim, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant estimé</label>
          <input
            type="number"
            className="form-control"
            placeholder="Entrez le montant estimé"
            onChange={(e) => setClaim({ ...claim, amount: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Documents</label>
          <input type="file" className="form-control" multiple onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Soumettre</button>
      </form>
    </div>
  );
};

export default SubmitClaim;