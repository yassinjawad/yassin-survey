import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../data/db';
import {
  getRespondentsBySurvey,
  getQuestionsBySurvey
} from '../../data/surveyService';
import './SurveyDetails.css';

export default function SurveyDetails() {
  const { id } = useParams();
  const surveyId = Number(id);

  const [survey, setSurvey] = useState(null);
  const [linkedRespondents, setLinkedRespondents] = useState([]);
  const [linkedQuestions, setLinkedQuestions] = useState([]);

  useEffect(() => {
    const fetchSurveyData = async () => {
      const foundSurvey = await db.surveys.get(surveyId);
      if (foundSurvey) {
        setSurvey(foundSurvey);
        const respondents = await getRespondentsBySurvey(surveyId);
        const questions = await getQuestionsBySurvey(surveyId);
        setLinkedRespondents(respondents);
        setLinkedQuestions(questions);
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  if (!survey) return <p>Loading survey...</p>;

  return (
    <div className="page-container">
      <div className="nav-buttons">
  <Link to="/">
    <button className="back-button">← Home</button>
  </Link>
  <Link to="/surveys">
    <button className="back-button">← All Surveys</button>
  </Link>
</div>

      <h2>Survey: {survey.name}</h2>

      <section>
        <h3>Respondents</h3>
        {linkedRespondents.length === 0 ? (
          <p>No respondents linked to this survey.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {linkedRespondents.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h3>Questions</h3>
        {linkedQuestions.length === 0 ? (
          <p>No questions linked to this survey.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {linkedQuestions.map((q, index) => (
                <tr key={q.id}>
                  <td>{index + 1}</td>
                  <td>{q.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}