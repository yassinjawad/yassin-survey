import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import {
  getRespondentsBySurvey,
  getQuestionsBySurvey
} from '../../data/surveyService';
import '../../App.css';
import Navbar from '../Navbar/Navbar';


export default function SurveySetup() {
  const { id } = useParams();
  const surveyId = Number(id);

  const [survey, setSurvey] = useState(undefined);
  const [linkedRespondents, setLinkedRespondents] = useState([]);
  const [linkedQuestions, setLinkedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [respondents, setRespondents] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [selectedRespondentId, setSelectedRespondentId] = useState('');

  useEffect(() => {
    const fetchSurveyData = async () => {
      const foundSurvey = await db.surveys.get(surveyId);
      setSurvey(foundSurvey ?? null);

      if (foundSurvey) {
        const respondents = await getRespondentsBySurvey(surveyId);
        const questions = await getQuestionsBySurvey(surveyId);
        setLinkedRespondents(respondents);
        setLinkedQuestions(questions);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  useEffect(() => {
    const fetchAll = async () => {
      const qs = await db.questions.toArray();
      const rs = await db.respondents.toArray();
      setQuestions(qs);
      setRespondents(rs);
    };

    fetchAll();
  }, []);

  if (survey === undefined) return <p>Loading survey...</p>;
  if (!survey) return (
    <div className="page-container">
      <h2>Survey not found.</h2>
      <Link to="/surveys">
        <button className="back-button">← Back to Surveys</button>
      </Link>
    </div>
  );

  const handleLinkQuestion = async () => {
    if (!selectedQuestionId) return;
    await db.survey_questions.add({ surveyId, questionId: Number(selectedQuestionId) });
    toast.success('Question linked!');
    setSelectedQuestionId('');
    const updated = await getQuestionsBySurvey(surveyId);
    setLinkedQuestions(updated);
  };

  const handleLinkRespondent = async () => {
    if (!selectedRespondentId) return;
    await db.survey_respondents.add({ surveyId, respondentId: Number(selectedRespondentId) });
    toast.success('Respondent linked!');
    setSelectedRespondentId('');
    const updated = await getRespondentsBySurvey(surveyId);
    setLinkedRespondents(updated);
  };

  const handleUnlinkQuestion = async (questionId) => {
    const link = await db.survey_questions.where({ surveyId, questionId }).first();
    if (link) {
      await db.survey_questions.delete(link.id);
      toast.success('Question removed!');
      const updated = await getQuestionsBySurvey(surveyId);
      setLinkedQuestions(updated);
    }
  };

  const handleUnlinkRespondent = async (respondentId) => {
    const link = await db.survey_respondents.where({ surveyId, respondentId }).first();
    if (link) {
      await db.survey_respondents.delete(link.id);
      toast.success('Respondent removed!');
      const updated = await getRespondentsBySurvey(surveyId);
      setLinkedRespondents(updated);
    }
  };

  return (
    <div className="page-container">
        <Navbar />
    
      {survey && <h2>Setup Survey: {survey.name}</h2>}

      <section>
        <h3>Linked Respondents</h3>
        {linkedRespondents.length === 0 ? (
          <p>No respondents linked yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {linkedRespondents.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td><button onClick={() => handleUnlinkRespondent(r.id)}>❌</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Linked Questions</h3>
        {linkedQuestions.length === 0 ? (
          <p>No questions linked yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {linkedQuestions.map((q, index) => (
                <tr key={q.id}>
                  <td>{index + 1}</td>
                  <td>{q.text}</td>
                  <td><button onClick={() => handleUnlinkQuestion(q.id)}>❌</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Add Question</h3>
        <select value={selectedQuestionId} onChange={(e) => setSelectedQuestionId(e.target.value)}>
          <option value="">Select question</option>
          {questions.map(q => <option key={q.id} value={q.id}>{q.text}</option>)}
        </select>
        <button onClick={handleLinkQuestion}>Add Question</button>
      </section>

      <section>
        <h3>Add Respondent</h3>
        <select value={selectedRespondentId} onChange={(e) => setSelectedRespondentId(e.target.value)}>
          <option value="">Select respondent</option>
          {respondents.map(r => <option key={r.id} value={r.id}>{r.name} ({r.email})</option>)}
        </select>
        <button onClick={handleLinkRespondent}>Add Respondent</button>
      </section>
    </div>
  );
}