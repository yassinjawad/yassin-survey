import React, { useState } from 'react';
import { db } from '../../data/db';

export default function RespondentCreate() {
  const [respondentName, setRespondentName] = useState('');

  const handleCreateRespondent = async () => {
    if (!respondentName) return alert('Please enter a respondent name');
    await db.respondents.add({ name: respondentName });
    alert('Respondent created!');
    setRespondentName('');  // Clear form
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create New Respondent</h2>
      <input
        type="text"
        placeholder="Enter respondent name"
        value={respondentName}
        onChange={(e) => setRespondentName(e.target.value)}
      />
      <button onClick={handleCreateRespondent}>Create Respondent</button>
    </div>
  );
}
