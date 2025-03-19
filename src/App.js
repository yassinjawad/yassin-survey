import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // surveys
  const [surveys, setSurveys] = useState([]);
  const [surveyName, setSurveyName] = useState('');

  // respondents
  const [respondents, setRespondents] = useState([]);
  const [respondentFullName, setRespondentFullName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');

  // questions
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');

  // Survey handlers
  const handleAddSurvey = (e) => {
    e.preventDefault();
    if (!surveyName.trim()) return;
    setSurveys([...surveys, { id: uuidv4(), name: surveyName }]);
    setSurveyName('');
  };

  const handleDeleteSurvey = (id) => {
    setSurveys(surveys.filter(survey => survey.id !== id));
  };

  // Respondent handlers
  const handleAddRespondent = (e) => {
    e.preventDefault();
    if (!respondentFullName.trim() || !respondentEmail.trim()) return;
    setRespondents([...respondents, { 
      id: uuidv4(), 
      fullName: respondentFullName,
      email: respondentEmail
    }]);
    setRespondentFullName('');
    setRespondentEmail('');
  };

  const handleDeleteRespondent = (id) => {
    setRespondents(respondents.filter(respondent => respondent.id !== id));
  };

  // Question handlers
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestions([...questions, { id: uuidv4(), text: questionText }]);
    setQuestionText('');
  };

  const handleDeleteQuestion = (id) => {
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