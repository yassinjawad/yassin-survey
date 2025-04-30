import React, { useState } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function SurveyCreate() {
  const [surveyName, setSurveyName] = useState('');

  const handleCreateSurvey = async () => {
    if (!surveyName.trim()) {
      toast.error('Survey name is required!');
      return;
    }

    await db.surveys.add({ name: surveyName.trim() });
    toast.success('Survey created!');
    setSurveyName('');
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>Create a New Survey</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Enter survey name"
          value={surveyName}
          onChange={(e) => setSurveyName(e.target.value)}
        />
        <button onClick={handleCreateSurvey}>Create</button>
      </div>
    </div>
  );
}
