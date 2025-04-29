import Dexie from 'dexie';

export const db = new Dexie('SurveyDatabase');

// Define schema
db.version(1).stores({
  surveys: '++id, name',
  respondents: '++id, name',
  questions: '++id, text',
  surveyRespondents: '++id, surveyId, respondentId',
  surveyQuestions: '++id, surveyId, questionId',
});
