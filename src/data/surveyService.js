// src/data/surveyService.js
import { db } from './db';

// ✅ Link a respondent to a survey
export const linkRespondentToSurvey = async (surveyId, respondentId) => {
  if (!surveyId || !respondentId) return;
  await db.table('survey_respondents').add({ surveyId, respondentId });
};

// ✅ Link a question to a survey
export const linkQuestionToSurvey = async (surveyId, questionId) => {
  if (!surveyId || !questionId) return;
  await db.table('survey_questions').add({ surveyId, questionId });
};

// ✅ Get respondents linked to a survey
export const getRespondentsBySurvey = async (surveyId) => {
  if (!surveyId || !db.table('survey_respondents')) return [];

  const links = await db.table('survey_respondents')
    .where('surveyId')
    .equals(surveyId)
    .toArray();

  const respondentIds = links.map(link => link.respondentId);
  return await db.respondents.where('id').anyOf(respondentIds).toArray();
};

// ✅ Get questions linked to a survey
export const getQuestionsBySurvey = async (surveyId) => {
  if (!surveyId || !db.table('survey_questions')) return [];

  const links = await db.table('survey_questions')
    .where('surveyId')
    .equals(surveyId)
    .toArray();

  const questionIds = links.map(link => link.questionId);
  return await db.questions.where('id').anyOf(questionIds).toArray();
};
