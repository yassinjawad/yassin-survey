import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SurveyCreate from './components/Survey/SurveyCreate';
import SurveyList from './components/Survey/SurveyList';
import SurveySetup from './components/Survey/SurveySetup';
import SurveyViewList from './components/Survey/SurveyViewList';
import SurveyView from './components/Survey/SurveyView';
import RespondentCreate from './components/Respondent/RespondentCreate';
import QuestionCreate from './components/Question/QuestionCreate';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Surveys */}
          <Route path="/create-survey" element={<SurveyCreate />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/survey/:id/setup" element={<SurveySetup />} />
          <Route path="/view-surveys" element={<SurveyViewList />} />
          <Route path="/survey/:id/view" element={<SurveyView />} />

          {/* Respondents */}
          <Route path="/create-respondent" element={<RespondentCreate />} />

          {/* Questions */}
          <Route path="/create-question" element={<QuestionCreate />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;