import React, { useState } from 'react';
import { db } from '../../data/db';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SurveyList.css';
import Navbar from '../Navbar/Navbar';



export default function SurveyCreate() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a survey name.");
      return;
    }

    await db.surveys.add({ name });
    toast.success("Survey created!");
    navigate("/surveys");
  };

  return (
    <div className="page-container">
      <Navbar />
      <h2>Create Survey</h2>

      <input
        type="text"
        placeholder="Survey Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate}>Create Survey</button>
    </div>
  );
}
