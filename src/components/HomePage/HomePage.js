import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function HomePage() {
  return (
    <div className="page-container">
      <Navbar />
      
      <h1>Welcome to the Survey Manager</h1>
      <p>Create, manage, and view your surveys easily.</p>

      <div className="button-grid">
        <Link to="/create-survey" className="action-button">
          <br />Create Survey
        </Link>

        <Link to="/create-respondent" className="action-button">
          <br />Add Respondent
        </Link>

        <Link to="/create-question" className="action-button">
          <br />Add Question
        </Link>

        <Link to="/surveys" className="action-button">
          <br />Set Up Surveys
        </Link>

        <Link to="/view-surveys" className="action-button">
          <br />View Surveys
        </Link>
      </div>
    </div>
  );
}
