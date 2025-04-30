import React, { useEffect, useState } from 'react';
import { db } from '../../data/db';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../Common/ConfirmDialog';
import './SurveyList.css'; // Optional if styles are in App.css

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      const all = await db.surveys.toArray();
      setSurveys(all);
    };
    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    await db.surveys.delete(id);
    toast.success('Survey deleted!');
    const updated = await db.surveys.toArray();
    setSurveys(updated);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) handleDelete(selectedId);
    setShowConfirm(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>All Surveys</h2>

      {surveys.length === 0 ? (
        <p>No surveys found. Create one using the navigation above.</p>
      ) : (
        <ul className="survey-list">
          {surveys.map((survey) => (
            <li key={survey.id} className="survey-item">
              <Link to={`/survey/${survey.id}`} className="survey-link">
                {survey.name}
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(survey.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this survey?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}