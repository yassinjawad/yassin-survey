// src/data/surveyService.js
import { db } from './db';

export async function linkRespondentToSurvey(surveyId, respondentId) {
  await db.surveyRespondents.add({ surveyId, respondentId });
}

export async function linkQuestionToSurvey(surveyId, questionId) {
  await db.surveyQuestions.add({ surveyId, questionId });
}

export async function getRespondentsBySurvey(surveyId) {
  const links = await db.surveyRespondents.where({ surveyId }).toArray();
  const ids = links.map(link => link.respondentId);
  return await db.respondents.bulkGet(ids);
}

export async function getQuestionsBySurvey(surveyId) {
  const links = await db.surveyQuestions.where({ surveyId }).toArray();
  const ids = links.map(link => link.questionId);
  return await db.questions.bulkGet(ids);
}
