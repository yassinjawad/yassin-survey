import React, { useState, useEffect } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function RespondentCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState('');

  useEffect(() => {
    const fetchSurveys = async () => {
      const all = await db.surveys.toArray();
      setSurveys(all);
    };
    fetchSurveys();
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !email.trim() || !selectedSurveyId) {
      toast.error('Please enter all fields and select a survey!');
      return;
    }

    try {
      const respondentId = await db.respondents.add({
        name: name.trim(),
        email: email.trim(),
      });

      await db.survey_respondents.add({
        surveyId: Number(selectedSurveyId),
        respondentId,
      });

      toast.success('Respondent added and linked!');
      setName('');
      setEmail('');
      setSelectedSurveyId('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>Add a New Respondent</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={selectedSurveyId}
          onChange={(e) => setSelectedSurveyId(e.target.value)}
        >
          <option value="">Select survey</option>
          {surveys.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <button onClick={handleCreate}>Add</button>
      </div>
    </div>
  );
}