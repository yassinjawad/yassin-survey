import React, { useState } from 'react';
import SurveyCreate from './components/Survey/SurveyCreate';
import SurveyDetails from './components/Survey/SurveyDetails';
import RespondentCreate from './components/Respondent/RespondentCreate';
import QuestionCreate from './components/Question/QuestionCreate';
import './App.css';

// Dummy data to simulate survey selection (you can replace it with real data from your database)
const mockSurveys = [
  { id: 1, name: 'Survey 1' },
  { id: 2, name: 'Survey 2' },
];

export default function App() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Yassin's Survey</h1>

      {/* Create Survey */}
      <SurveyCreate />

      {/* Create Respondent */}
      <RespondentCreate />

      {/* Create Question */}
      <QuestionCreate />

      {/* Survey List */}
      <div>
        <h2>Choose a Survey to View Details</h2>
        {mockSurveys.map(survey => (
          <button key={survey.id} onClick={() => handleSurveySelect(survey)}>
            {survey.name}
          </button>
        ))}
      </div>

      {/* Survey Details */}
      {selectedSurvey && <SurveyDetails survey={selectedSurvey} />}
    </div>
  );
}
