import { useState, useCallback, useRef, useEffect } from 'react'
import { saveProgress, saveScore, getStatistics } from '../data/quizData'
import { isValidExamType, isValidAnswerIndex } from '../utils/validation'
import { examTypes } from '../data/quizData'

/**
 * 퀴즈 상태 관리 커스텀 훅
 * 상태 관리 로직을 분리하여 재사용성과 테스트 가능성 향상
 */
export const useQuizState = (initialExamType = '정보처리기사') => {
  const [examType, setExamType] = useState(initialExamType)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())
  const [examMode, setExamMode] = useState('practice')
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const timerRef = useRef(null)

  // 시험 유형 변경
  const changeExamType = useCallback((newExamType) => {
    if (!isValidExamType(newExamType, examTypes)) {
      setError('Invalid exam type')
      return false
    }
    setExamType(newExamType)
    resetState()
    return true
  }, [])

  // 상태 리셋
  const resetState = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    setExamMode('practice')
    setTimeRemaining(null)
    setError(null)
    setIsLoading(false)
  }, [])

  // 답 선택
  const selectAnswer = useCallback((answerIndex, optionsLength) => {
    if (!isValidAnswerIndex(answerIndex, optionsLength)) {
      setError('Invalid answer index')
      return false
    }
    setSelectedAnswer(answerIndex)
    setError(null)
    return true
  }, [])

  // 답 제출
  const submitAnswer = useCallback((question, onSuccess, onError) => {
    if (!question) {
      setError('No question available')
      return false
    }

    if (selectedAnswer === null) {
      onError?.('답을 선택해주세요.')
      return false
    }

    if (!isValidAnswerIndex(selectedAnswer, question.options.length)) {
      setError('Invalid answer selection')
      return false
    }

    setIsLoading(true)
    setError(null)

    const isCorrect = selectedAnswer === question.correctAnswer
    setShowResult(true)

    // 진행 상황 저장
    const saveResult = saveProgress(examType, question.id, selectedAnswer, isCorrect)
    if (!saveResult.success) {
      onError?.('진행 상황 저장에 실패했습니다.')
    }

    if (isCorrect) {
      setScore((prev) => prev + 1)
      onSuccess?.('정답입니다! 🎉')
    } else {
      onError?.('오답입니다. 다시 생각해보세요.')
    }

    setAnsweredQuestions((prev) => new Set([...prev, question.id]))
    setIsLoading(false)
    return isCorrect
  }, [selectedAnswer, examType])

  // 다음 문제
  const nextQuestion = useCallback((questionsLength, onComplete) => {
    if (currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setError(null)
    } else {
      // 모든 문제 완료
      const saveResult = saveScore(examType, score, questionsLength)
      if (saveResult.success) {
        onComplete?.('모든 문제를 완료했습니다!')
      }
      return true
    }
    return false
  }, [currentQuestionIndex, examType, score])

  // 이전 문제
  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setError(null)
      return true
    }
    return false
  }, [currentQuestionIndex])

  // 시험 모드 시작
  const startExam = useCallback((questionsLength) => {
    setExamMode('exam')
    setTimeRemaining(questionsLength * 60) // 문제당 1분
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(new Set())
    setSelectedAnswer(null)
    setShowResult(false)
    setError(null)
  }, [])

  // 타이머 관리
  useEffect(() => {
    if (examMode === 'exam' && timeRemaining !== null && timeRemaining > 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [examMode, timeRemaining])

  // 통계 가져오기 (메모이제이션 필요 시 외부에서 처리)
  const statistics = getStatistics(examType)

  return {
    // State
    examType,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    score,
    answeredQuestions,
    examMode,
    timeRemaining,
    isLoading,
    error,
    statistics,

    // Actions
    changeExamType,
    resetState,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    startExam,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    setShowResult,
    setScore,
    setExamMode,
    setTimeRemaining,
    setError,
    setIsLoading,
  }
}

