import React, { useEffect, useState } from 'react';
import { db } from '../../data/db';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../Common/ConfirmDialog';
import './SurveyList.css';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      const all = await db.surveys.toArray();
      setSurveys(all);
    };
    fetchSurveys();
  }, []);

  const handleDeleteClick = (target, id) => {
    setConfirmTarget(target);
    setConfirmId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmTarget === 'survey') {
      await db.surveys.delete(confirmId);
      toast.success('Survey deleted!');
      const updated = await db.surveys.toArray();
      setSurveys(updated);
    }
    setShowConfirm(false);
    setConfirmTarget(null);
    setConfirmId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setConfirmTarget(null);
    setConfirmId(null);
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>All Surveys</h2>

      {surveys.length === 0 ? (
        <p>No surveys found. Create one from the navbar above.</p>
      ) : (
        <ul className="survey-list">
          {surveys.map((survey) => (
            <li key={survey.id} className="survey-item">
              <Link to={`/survey/${survey.id}`} className="survey-link">
                {survey.name}
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick('survey', survey.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {showConfirm && (
        <ConfirmDialog
          message={`Are you sure you want to delete this ${confirmTarget}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
