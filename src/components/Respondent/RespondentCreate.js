import React, { useState } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function RespondentCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Both name and email are required!');
      return;
    }

    try {
      await db.respondents.add({ name: name.trim(), email: email.trim() });
      toast.success('Respondent added!');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding respondent:', error);
      toast.error('Failed to create respondent.');
    }
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>Add a New Respondent</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreate}>Add</button>
      </div>
    </div>
  );
}