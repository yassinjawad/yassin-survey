import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../../data/db';
import {
  linkRespondentToSurvey,
  linkQuestionToSurvey,
  getRespondentsBySurvey,
  getQuestionsBySurvey
} from '../../data/surveyService';

export default function SurveyDetails({ survey }) {
  const [respondents, setRespondents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [linkedRespondents, setLinkedRespondents] = useState([]);
  const [linkedQuestions, setLinkedQuestions] = useState([]);
  const [selectedRespondentId, setSelectedRespondentId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Moved fetchInitialData outside, wrapped with useCallback
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
    await fetchInitialData();
  };

  const handleLinkQuestion = async () => {
    if (!selectedQuestionId) return;
    await linkQuestionToSurvey(survey.id, Number(selectedQuestionId));
    await fetchInitialData();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Survey: {survey.name}</h2>

      {/* Link Respondent */}
      <div>
        <h3>Link a Respondent</h3>
        <select onChange={e => setSelectedRespondentId(e.target.value)} defaultValue="">
          <option value="" disabled>Select respondent</option>
          {respondents.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <button onClick={handleLinkRespondent}>Add</button>
      </div>

      {/* Link Question */}
      <div>
        <h3>Link a Question</h3>
        <select onChange={e => setSelectedQuestionId(e.target.value)} defaultValue="">
          <option value="" disabled>Select question</option>
          {questions.map(q => (
            <option key={q.id} value={q.id}>{q.text}</option>
          ))}
        </select>
        <button onClick={handleLinkQuestion}>Add</button>
      </div>

      {/* Linked Respondents */}
      <div>
        <h3>Respondents in this Survey</h3>
        <ul>
          {linkedRespondents.map(r => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </div>

      {/* Linked Questions */}
      <div>
        <h3>Questions in this Survey</h3>
        <ul>
          {linkedQuestions.map(q => (
            <li key={q.id}>{q.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
