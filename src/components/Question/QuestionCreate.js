import React, { useState } from 'react';
import { db } from '../../data/db';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function QuestionCreate() {
  const [text, setText] = useState('');

  const handleCreate = async () => {
    if (!text.trim()) {
      toast.error('Question text is required!');
      return;
    }

    await db.questions.add({ text: text.trim() });
    toast.success('Question added!');
    setText('');
  };

  return (
    <div className="page-container">
      <Link to="/">
        <button className="back-button">← Home</button>
      </Link>

      <h2>Add a New Question</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Enter question text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleCreate}>Add</button>
      </div>
    </div>
  );
}