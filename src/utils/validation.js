/**
 * 데이터 검증 유틸리티
 */

import { examTypes, quizData } from '../data/quizData'

/**
 * 시험 유형 검증
 */
export const isValidExamType = (examType) => {
  return Object.values(examTypes).includes(examType)
}

/**
 * 문제 인덱스 검증
 */
export const isValidQuestionIndex = (index, questions) => {
  return typeof index === 'number' && index >= 0 && index < questions.length
}

/**
 * 선택지 인덱스 검증
 */
export const isValidAnswerIndex = (index, options) => {
  return typeof index === 'number' && index >= 0 && index < options.length
}

/**
 * 문제 데이터 검증
 */
export const validateQuestion = (question) => {
  if (!question) return { valid: false, error: 'Question is required' }
  
  if (!question.id) return { valid: false, error: 'Question ID is required' }
  if (!question.question || typeof question.question !== 'string') {
    return { valid: false, error: 'Question text is required' }
  }
  if (!Array.isArray(question.options) || question.options.length === 0) {
    return { valid: false, error: 'Options array is required' }
  }
  if (typeof question.correctAnswer !== 'number' || 
      question.correctAnswer < 0 || 
      question.correctAnswer >= question.options.length) {
    return { valid: false, error: 'Invalid correctAnswer index' }
  }
  
  return { valid: true }
}

/**
 * 퀴즈 데이터 검증
 */
export const validateQuizData = (examType) => {
  if (!isValidExamType(examType)) {
    return { valid: false, error: `Invalid exam type: ${examType}` }
  }

  const questions = quizData[examType] || []
  
  if (questions.length === 0) {
    return { valid: false, error: `No questions found for ${examType}` }
  }

  // 각 문제 검증
  for (let i = 0; i < questions.length; i++) {
    const validation = validateQuestion(questions[i])
    if (!validation.valid) {
      return { valid: false, error: `Question ${i + 1}: ${validation.error}` }
    }
  }

  return { valid: true, count: questions.length }
}

/**
 * 점수 검증
 */
export const validateScore = (score, totalQuestions) => {
  if (typeof score !== 'number' || score < 0) {
    return { valid: false, error: 'Invalid score value' }
  }
  if (typeof totalQuestions !== 'number' || totalQuestions <= 0) {
    return { valid: false, error: 'Invalid total questions value' }
  }
  if (score > totalQuestions) {
    return { valid: false, error: 'Score cannot exceed total questions' }
  }
  return { valid: true }
}

/**
 * 진행 상황 검증
 */
export const validateProgress = (progress) => {
  if (!progress || typeof progress !== 'object') {
    return { valid: false, error: 'Invalid progress data' }
  }
  return { valid: true }
}
