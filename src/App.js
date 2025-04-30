import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SurveyCreate from './components/Survey/SurveyCreate';
import RespondentCreate from './components/Respondent/RespondentCreate';
import QuestionCreate from './components/Question/QuestionCreate';
import HomePage from './components/HomePage/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SurveyList from './components/Survey/SurveyList';
import SurveyDetailsWrapper from './components/Survey/SurveyDetailsWrapper';
import './App.css';
import SurveyDetails from './components/Survey/SurveyDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer /> {/* Make sure this exists */}
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-survey" element={<SurveyCreate />} />
          <Route path="/create-respondent" element={<RespondentCreate />} />
          <Route path="/create-question" element={<QuestionCreate />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/survey/:id" element={<SurveyDetailsWrapper />} />
          <Route path="/survey/:id" element={<SurveyDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
