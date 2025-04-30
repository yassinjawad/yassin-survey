import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page-container">
      <h1>Welcome to the Survey Manager</h1>
      <p>Create and manage your surveys, respondents, and questions.</p>

      <div className="button-grid">
        <Link to="/create-survey" className="action-button">
          <br />Create <br />Survey
        </Link>

        <Link to="/create-respondent" className="action-button">
          <br />Add <br />Respondent
        </Link>

        <Link to="/create-question" className="action-button">
          <br />Add <br />Question
        </Link>

        <Link to="/surveys" className="action-button">
          <br />View <br />Surveys
        </Link>
      </div>
    </div>
  );
}
