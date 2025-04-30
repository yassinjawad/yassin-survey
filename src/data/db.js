import Dexie from 'dexie';

export const db = new Dexie('YassinSurveyDB');

db.version(1).stores({
  surveys: '++id, name',
  questions: '++id, text',
  respondents: '++id, name, email',
  survey_questions: '++id, surveyId, questionId',
  survey_respondents: '++id, surveyId, respondentId'
});