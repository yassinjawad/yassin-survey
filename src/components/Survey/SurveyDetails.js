// src/components/Survey/SurveyDetails.js

import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../../data/db';
import {
  linkRespondentToSurvey,
  linkQuestionToSurvey,
  getRespondentsBySurvey,
  getQuestionsBySurvey
} from '../../data/surveyService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../Common/ConfirmDialog';
import './SurveyDetails.css'; // 👈 import the styling

export default function SurveyDetails({ survey }) {
  const [respondents, setRespondents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [linkedRespondents, setLinkedRespondents] = useState([]);
  const [linkedQuestions, setLinkedQuestions] = useState([]);
  const [selectedRespondentId, setSelectedRespondentId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const fetchInitialData = useCallback(async () => {
    const allRespondents = await db.respondents.toArray();
    const allQuestions = await db.questions.toArray();
    const linkedR = await getRespondentsBySurvey(survey.id);
    const linkedQ = await getQuestionsBySurvey(survey.id);

    setRespondents(allRespondents);
    setQuestions(allQuestions);
    setLinkedRespondents(linkedR);
    setLinkedQuestions(linkedQ);
  }, [survey.id]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleLinkRespondent = async () => {
    if (!selectedRespondentId) return;
    await linkRespondentToSurvey(survey.id, Number(selectedRespondentId));
    toast.success('Respondent linked!');
    await fetchInitialData();
  };

  const handleLinkQuestion = async () => {
    if (!selectedQuestionId) return;
    await linkQuestionToSurvey(survey.id, Number(selectedQuestionId));
    toast.success('Question linked!');
    await fetchInitialData();
  };

  const handleDeleteClick = (target, id) => {
    setConfirmTarget(target);
    setConfirmId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmTarget === 'respondent') {
      await db.respondents.delete(confirmId);
      toast.success('Respondent deleted!');
    } else if (confirmTarget === 'question') {
      await db.questions.delete(confirmId);
      toast.success('Question deleted!');
    }
    setShowConfirm(false);
    await fetchInitialData();
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setConfirmTarget(null);
    setConfirmId(null);
  };

  return (
    <div className="survey-details">
      <Link to="/surveys">
        <button className="back-button">← Back to Surveys</button>
      </Link>

      <h2>{survey.name}</h2>

      <div className="section">
        <h3>Link a Respondent</h3>
        <div className="input-group">
          <select onChange={e => setSelectedRespondentId(e.target.value)} defaultValue="">
            <option value="" disabled>Select respondent</option>
            {respondents.map(r => (
  <option key={r.id} value={r.id}>
    {r.name}{r.email ? ` (${r.email})` : ''}
  </option>
))}
          </select>
          <button onClick={handleLinkRespondent}>Link</button>
        </div>
      </div>

      <div className="section">
        <h3>Link a Question</h3>
        <div className="input-group">
          <select onChange={e => setSelectedQuestionId(e.target.value)} defaultValue="">
            <option value="" disabled>Select question</option>
            {questions.map(q => (
              <option key={q.id} value={q.id}>{q.text}</option>
            ))}
          </select>
          <button onClick={handleLinkQuestion}>Link</button>
        </div>
      </div>

      <div className="section">
        <h3>Respondents in this Survey</h3>
        <ul>
        {linkedRespondents.map((r, i) =>
  r ? (
    <li key={r.id || i}>
      {r.name}{r.email ? ` (${r.email})` : ''}
      <button className="delete-btn" onClick={() => handleDeleteClick('respondent', r.id)}>Delete</button>
    </li>
  ) : null
)}

        </ul>
      </div>

      <div className="section">
        <h3>Questions in this Survey</h3>
        <ul>
          {linkedQuestions.map((q, i) =>
            q ? (
              <li key={q.id || i}>
                {q.text}
                <button className="delete-btn" onClick={() => handleDeleteClick('question', q.id)}>Delete</button>
              </li>
            ) : null
          )}
        </ul>
      </div>

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
