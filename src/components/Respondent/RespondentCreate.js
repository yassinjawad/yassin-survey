import React, { useState, useEffect } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

export default function RespondentCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [respondents, setRespondents] = useState([]);

  useEffect(() => {
    const fetchRespondents = async () => {
      const all = await db.respondents.toArray();
      setRespondents(all);
    };

    fetchRespondents();
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter full name and email.");
      return;
    }

    await db.respondents.add({ name, email });
    toast.success("Respondent added!");
    setName('');
    setEmail('');

    const updated = await db.respondents.toArray();
    setRespondents(updated);
  };

  const handleDeleteRespondent = async (id) => {
    if (window.confirm("Are you sure you want to delete this respondent?")) {
      await db.respondents.delete(id);
      toast.success("Respondent deleted!");
      const updated = await db.respondents.toArray();
      setRespondents(updated);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <h2>Add Respondent</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleCreate}>Add Respondent</button>

      <section style={{ marginTop: '2rem' }}>
        <h3>Existing Respondents</h3>

        {respondents.length === 0 ? (
          <p>No respondents yet.</p>
        ) : (
          <ul>
            {respondents.map((r) => (
              <li key={r.id} style={{ marginBottom: '0.5rem' }}>
                {r.name} ({r.email})
                <button
                  onClick={() => handleDeleteRespondent(r.id)}
                  style={{
                    marginLeft: '1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}