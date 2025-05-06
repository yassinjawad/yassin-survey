import React, { useState, useEffect } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

export default function QuestionCreate() {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const all = await db.questions.toArray();
      setQuestions(all);
    };

    fetchQuestions();
  }, []);

  const handleCreate = async () => {
    if (!text.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    await db.questions.add({ text });
    toast.success("Question added!");
    setText('');

    const updated = await db.questions.toArray();
    setQuestions(updated);
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await db.questions.delete(id);
      toast.success("Question deleted!");
      const updated = await db.questions.toArray();
      setQuestions(updated);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <h2>Add Question</h2>

      <input
        type="text"
        placeholder="Question Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleCreate}>Add Question</button>

      <section style={{ marginTop: '2rem' }}>
        <h3>Existing Questions</h3>

        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          <ul>
            {questions.map((q) => (
              <li key={q.id} style={{ marginBottom: '0.5rem' }}>
                {q.text}
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
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