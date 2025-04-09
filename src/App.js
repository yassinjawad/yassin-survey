import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

function App() {
  const [surveys, setSurveys] = useState([]);
  const [surveyName, setSurveyName] = useState('');

  const [respondents, setRespondents] = useState([]);
  const [respondentFullName, setRespondentFullName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');

  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setSurveys(await db.surveys.toArray());
      setRespondents(await db.respondents.toArray());
      setQuestions(await db.questions.toArray());
    };
    fetchData();
  }, []);

  // Survey handlers
  const handleAddSurvey = async (e) => {
    e.preventDefault();
    if (!surveyName.trim()) return;
    const newSurvey = { id: uuidv4(), name: surveyName };
    await db.surveys.add(newSurvey);
    setSurveys([...surveys, newSurvey]);
    setSurveyName('');
  };

  const handleDeleteSurvey = async (id) => {
    await db.surveys.where('id').equals(id).delete();
    setSurveys(surveys.filter(survey => survey.id !== id));
  };

  // Respondent handlers
  const handleAddRespondent = async (e) => {
    e.preventDefault();
    if (!respondentFullName.trim() || !respondentEmail.trim()) return;
    const newRespondent = {
      id: uuidv4(),
      fullName: respondentFullName,
      email: respondentEmail
    };
    await db.respondents.add(newRespondent);
    setRespondents([...respondents, newRespondent]);
    setRespondentFullName('');
    setRespondentEmail('');
  };

  const handleDeleteRespondent = async (id) => {
    await db.respondents.where('id').equals(id).delete();
    setRespondents(respondents.filter(respondent => respondent.id !== id));
  };

  // Question handlers
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    const newQuestion = { id: uuidv4(), text: questionText };
    await db.questions.add(newQuestion);
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
  };

  const handleDeleteQuestion = async (id) => {
    await db.questions.where('id').equals(id).delete();
    setQuestions(questions.filter(question => question.id !== id));
  };

  return (
    <div className="app">
      <h1>Yassin's Survey</h1>

      {/* Surveys Section */}
      <div className="section">
        <h2>Survey's Name</h2>
        <form onSubmit={handleAddSurvey}>
          <input
            type="text"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            placeholder="Enter survey name"
            required
          />
          <button type="submit">Create Survey</button>
        </form>
        <ul>
          {surveys.map(survey => (
            <li key={survey.id}>
              {survey.name}
              <button onClick={() => handleDeleteSurvey(survey.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Respondents Section */}
      <div className="section">
        <h2>Respondents</h2>
        <form onSubmit={handleAddRespondent}>
          <input
            type="text"
            value={respondentFullName}
            onChange={(e) => setRespondentFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={respondentEmail}
            onChange={(e) => setRespondentEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Create Respondent</button>
        </form>
        <ul>
          {respondents.map(respondent => (
            <li key={respondent.id}>
              {respondent.fullName} - {respondent.email}
              <button onClick={() => handleDeleteRespondent(respondent.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Questions Section */}
      <div className="section">
        <h2>Questions</h2>
        <form onSubmit={handleAddQuestion}>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question text"
            required
          />
          <button type="submit">Create Question</button>
        </form>
        <ul>
          {questions.map(question => (
            <li key={question.id}>
              {question.text}
              <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
