import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../data/db';
import SurveyDetails from './SurveyDetails';


export default function SurveyDetailsWrapper() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      const s = await db.surveys.get(Number(id));
      setSurvey(s);
    };
    fetchSurvey();
  }, [id]);

  if (!survey) return <p>Loading survey...</p>;

  return <SurveyDetails survey={survey} />;
}