import React, { useState } from 'react';
import { db } from '../../data/db';

export default function SurveyCreate() {
  const [surveyName, setSurveyName] = useState('');

  const handleCreateSurvey = async () => {
    if (!surveyName) return alert('Please enter a survey name');
    await db.surveys.add({ name: surveyName });
    alert('Survey created!');
    setSurveyName('');  // Clear form
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create New Survey</h2>
      <input
        type="text"
        placeholder="Enter survey name"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />
      <button onClick={handleCreateSurvey}>Create Survey</button>
    </div>
  );
}
