import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { FaEdit, FaInfoCircle } from 'react-icons/fa'; // Import des icônes

const ViewClaims = () => {
  const [claims, setClaims] = useState([]);
  const userId = localStorage.getItem('userId');

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
    const fetchClaims = async () => {
      try {
        const response = await api.get(`/insureds/${userId}/claims`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setClaims(response.data);
      } catch (error) {
        alert('Erreur lors du chargement des réclamations : ' + error.response?.data?.message);
      }
    };

    if (userId) fetchClaims();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Vos réclamations</h2>
      {claims.length > 0 ? (
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>État</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={claim.id}>
                <td>{index + 1}</td>
                <td>{claim.claimType}</td>
                <td>{getStatusLabel(claim.status)}</td>
                <td>{new Date(claim.incidentDate).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/view-claims/${claim.id}`}
                    className="btn btn-info btn-sm mx-1"
                    title="Détails"
                  >
                    <FaInfoCircle /> Détails
                  </Link>
                  <Link
                    to={`/edit-claim/${claim.id}`} // Redirection vers la page d'édition
                    className="btn btn-warning btn-sm mx-1"
                    title="Modifier"
                  >
                    <FaEdit /> Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-3">Aucune réclamation trouvée.</p>
      )}
    </div>
  );
};

export default ViewClaims;
