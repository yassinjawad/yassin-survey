import React, { useState, useEffect } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function QuestionCreate() {
  const [text, setText] = useState('');
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
    if (!text.trim() || !selectedSurveyId) {
      toast.error('Please enter a question and select a survey!');
      return;
    }

    try {
      const questionId = await db.questions.add({ text: text.trim() });

      await db.survey_questions.add({
        surveyId: Number(selectedSurveyId),
        questionId,
      });

      toast.success('Question added and linked!');
      setText('');
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

      <h2>Add a New Question</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Enter question text"
          value={text}
          onChange={(e) => setText(e.target.value)}
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