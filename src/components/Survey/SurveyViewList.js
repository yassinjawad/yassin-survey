import React, { useEffect, useState } from 'react';
import { db } from '../../data/db';
import { Link } from 'react-router-dom';
import '../../App.css';
import Navbar from '../Navbar/Navbar';

export default function SurveyViewList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const all = await db.surveys.toArray();
      setSurveys(all);
    };
    fetchSurveys();
  }, []);

  return (
    <div className="page-container">
        <Navbar />
      
      <h2>View Surveys</h2>

      {surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <ul className="survey-list">
          {surveys.map((survey) => (
            <li key={survey.id} className="survey-item">
              <Link to={`/survey/${survey.id}/view`} className="survey-link">
                {survey.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}