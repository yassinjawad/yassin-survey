import React, { useState } from 'react';
import { db } from '../../data/db';

export default function QuestionCreate() {
  const [questionText, setQuestionText] = useState('');

  const handleCreateQuestion = async () => {
    if (!questionText) return alert('Please enter a question text');
    await db.questions.add({ text: questionText });
    alert('Question created!');
    setQuestionText('');  // Clear form
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create New Question</h2>
      <input
        type="text"
        placeholder="Enter question text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <button onClick={handleCreateQuestion}>Create Question</button>
    </div>
  );
}
