// src/db.js
import Dexie from 'dexie';

export const db = new Dexie('YassinSurveyDB');

db.version(1).stores({
  surveys: 'id, name',
  respondents: 'id, fullName, email',
  questions: 'id, text',
});
