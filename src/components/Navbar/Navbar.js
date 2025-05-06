import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-survey">Create Survey</Link>
      <Link to="/create-respondent">Add Respondent</Link>
      <Link to="/create-question">Add Question</Link>
      <Link to="/surveys">Setup Surveys</Link>
      <Link to="/view-surveys">View Surveys</Link>
    </nav>
  );
}
