import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Home
      </NavLink>
      <NavLink to="/create-survey" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Create Survey
      </NavLink>
      <NavLink to="/create-respondent" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Add Respondent
      </NavLink>
      <NavLink to="/create-question" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Add Question
      </NavLink>
      <NavLink to="/surveys" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        View Surveys
      </NavLink>
    </nav>
  );
}
