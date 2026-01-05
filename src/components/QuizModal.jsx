import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizData, examTypes, saveProgress, saveScore, getStatistics, getProgress } from '../data/quizData'
import { useToast } from '../hooks/useToast'
import Toast from './common/Toast'
import QuizResultModal from './QuizResultModal'
import { isValidExamType, isValidQuestionIndex, isValidAnswerIndex, validateQuestion } from '../utils/validation'
import ErrorBoundary from './common/ErrorBoundary'

const QuizModal = ({ isOpen, onClose, initialExamType = '정보처리기사' }) => {
  const { toast, showToast, hideToast } = useToast()

  const [examType, setExamType] = useState(initialExamType)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())
  const [examMode, setExamMode] = useState('practice')
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showResultModal, setShowResultModal] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState([])

  // 타이머 ref (정리용)
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  // 데이터 검증 및 메모이제이션
  const questions = useMemo(() => {
    if (!isValidExamType(examType)) {
      setError(`Invalid exam type: ${examType}`)
      return []
    }
    return quizData[examType] || []
  }, [examType])

  const currentQuestion = useMemo(() => {
    if (!isValidQuestionIndex(currentQuestionIndex, questions)) {
      return null
    }
    const question = questions[currentQuestionIndex]
    const validation = validateQuestion(question)
    if (!validation.valid) {
      setError(validation.error)
      return null
    }
    return question
  }, [currentQuestionIndex, questions])

  const statistics = useMemo(() => {
    return getStatistics(examType)
  }, [examType])

  // 모달이 닫힐 때 상태 초기화 및 타이머 정리
  useEffect(() => {
    if (!isOpen) {
      // 타이머 정리
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      
      // 상태 초기화
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setAnsweredQuestions(new Set())
      setExamMode('practice')
      setTimeRemaining(null)
      setError(null)
    }
  }, [isOpen])

  // 접근성: 모션 감소 설정
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 키보드 네비게이션
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (showResult) return

      // 숫자 키로 선택지 선택 (1-4)
      if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1
        if (isValidAnswerIndex(index, currentQuestion?.options || [])) {
          handleAnswerSelect(index)
        }
      }

      // Enter로 답 제출
      if (e.key === 'Enter' && selectedAnswer !== null) {
        handleSubmitAnswer()
      }

      // 화살표 키로 문제 이동
      if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        handlePrevQuestion()
      }
      if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
        handleNextQuestion()
      }

      // Escape로 모달 닫기
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showResult, selectedAnswer, currentQuestionIndex, questions.length, currentQuestion])

  // 시험 모드 타이머 (useCallback으로 함수 안정화)
  const handleExamComplete = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    const result = saveScore(examType, score, questions.length)
    if (result.success) {
      showToast('시험이 완료되었습니다!', 'success')
    } else {
      showToast('점수 저장 중 오류가 발생했습니다.', 'error')
    }
    
    setExamMode('practice')
    setTimeRemaining(null)
  }, [examType, score, questions.length, showToast])

  // 타이머 설정 (의존성 배열 최적화)
  useEffect(() => {
    // 기존 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (examMode === 'exam' && timeRemaining !== null && timeRemaining > 0 && isOpen) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            handleExamComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    // 클린업
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [examMode, isOpen, handleExamComplete]) // timeRemaining 제거 (내부에서 관리)

  // 포커스 관리 (모달 열릴 때 첫 번째 요소에 포커스)
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const firstFocusable = containerRef.current.querySelector('button, select, [tabindex]:not([tabindex="-1"])')
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100)
      }
    }
  }, [isOpen])

  const handleAnswerSelect = useCallback((answerIndex) => {
    if (showResult || !currentQuestion) return
    
    if (!isValidAnswerIndex(answerIndex, currentQuestion.options)) {
      setError('Invalid answer index')
      return
    }
    
    setSelectedAnswer(answerIndex)
    setError(null)
  }, [showResult, currentQuestion])

  const handleSubmitAnswer = useCallback(async () => {
    if (selectedAnswer === null || !currentQuestion) {
      showToast('답을 선택해주세요.', 'error')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      setShowResult(true)

      // 진행 상황 저장
      const result = saveProgress(examType, currentQuestion.id, selectedAnswer, isCorrect)
      if (!result.success) {
        showToast('진행 상황 저장 중 오류가 발생했습니다.', 'warning')
      }

      if (isCorrect) {
        setScore((prev) => prev + 1)
        showToast('정답입니다! 🎉', 'success')
      } else {
        showToast('오답입니다. 다시 생각해보세요.', 'error')
      }

      setAnsweredQuestions((prev) => new Set([...prev, currentQuestion.id]))
    } catch (error) {
      setError(error.message)
      showToast('오류가 발생했습니다.', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [selectedAnswer, currentQuestion, examType, showToast])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setError(null)
    } else {
      // 모든 문제 완료 - 오답 수집
      const progress = getProgress(examType)
      const wrong = questions
        .map((q, idx) => ({ ...q, index: idx }))
        .filter((q) => {
          const answer = progress[q.id]
          return answer && !answer.isCorrect
        })
      setWrongAnswers(wrong)

      const result = saveScore(examType, score, questions.length)
      if (result.success) {
        showToast('모든 문제를 완료했습니다!', 'success')
      }
      
      // 결과 모달 표시
      setShowResultModal(true)
      
      if (examMode === 'exam') {
        handleExamComplete()
      }
    }
  }, [currentQuestionIndex, questions, questions.length, examType, score, examMode, handleExamComplete, showToast])

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setError(null)
    }
  }, [currentQuestionIndex])

  const handleStartExam = useCallback(() => {
    setExamMode('exam')
    setTimeRemaining(questions.length * 60) // 문제당 1분
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(new Set())
    setSelectedAnswer(null)
    setShowResult(false)
    setError(null)
  }, [questions.length])

  const handleReset = useCallback(() => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    setExamMode('practice')
    setTimeRemaining(null)
    setError(null)
  }, [])

  const handleExamTypeChange = useCallback((newExamType) => {
    if (!isValidExamType(newExamType)) {
      setError(`Invalid exam type: ${newExamType}`)
      return
    }
    setExamType(newExamType)
    handleReset()
  }, [handleReset])

  const formatTime = useCallback((seconds) => {
    if (seconds === null || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  const progress = useMemo(() => {
    if (!currentQuestion || questions.length === 0) return 0
    return ((currentQuestionIndex + 1) / questions.length) * 100
  }, [currentQuestion, currentQuestionIndex, questions.length])

  if (!isOpen) return null

  // 에러 상태 처리
  if (questions.length === 0 || error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-red-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-xl font-bold text-red-600 mb-4">오류 발생</h3>
          <p className="text-slate-600 mb-6">{error || '문제를 불러올 수 없습니다.'}</p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
          >
            닫기
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isOpen && (
          <div 
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl border border-white/50 my-8"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/90 transition-all z-10"
                aria-label="모달 닫기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 헤더 */}
              <div className="px-8 pt-8 pb-6 border-b border-white/30">
                <h2 id="quiz-modal-title" className="sr-only">퀴즈 모달</h2>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* 시험 선택 */}
                    <select
                      value={examType}
                      onChange={(e) => handleExamTypeChange(e.target.value)}
                      className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold shadow-sm hover:bg-white/80 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label="시험 유형 선택"
                    >
                      {Object.values(examTypes).map((type) => (
                        <option key={type} value={type} className="bg-slate-900">
                          {type}
                        </option>
                      ))}
                    </select>

                    {/* 타이머 */}
                    {examMode === 'exam' && timeRemaining !== null && (
                      <div 
                        className="px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl"
                        role="timer"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <span className="text-red-600 text-sm font-bold">{formatTime(timeRemaining)}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-slate-600 text-sm font-medium" aria-live="polite">
                    정답률: <span className="text-slate-900 font-bold">{statistics.accuracy}%</span> ({statistics.correct}/{statistics.answered})
                  </div>
                </div>

                {/* 진행률 바 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 text-sm font-medium">
                      문제 {currentQuestionIndex + 1} / {questions.length}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {Math.round(progress)}% 완료
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* 메인 콘텐츠 */}
              {currentQuestion && (
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* 카테고리 */}
                      <div className="mb-6">
                        <span className="inline-block px-4 py-1.5 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-700 text-sm font-semibold">
                          {currentQuestion.category}
                        </span>
                      </div>

                      {/* 문제 */}
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-relaxed">
                        {currentQuestion.question}
                      </h3>

                      {/* 선택지 */}
                      <div className="space-y-3 mb-8" role="radiogroup" aria-label="답안 선택">
                        {currentQuestion.options.map((option, index) => {
                          const isSelected = selectedAnswer === index
                          const isCorrect = index === currentQuestion.correctAnswer
                          const showAnswer = showResult

                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showResult || isLoading}
                              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                                showAnswer && isCorrect
                                  ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/10'
                                  : showAnswer && isSelected && !isCorrect
                                  ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/10'
                                  : isSelected
                                  ? 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/10'
                                  : 'bg-white/40 border-white/50 hover:bg-white/60 hover:border-white/70'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                              whileHover={!showResult && !isLoading ? { scale: 1.01, x: 4 } : {}}
                              whileTap={!showResult && !isLoading ? { scale: 0.99 } : {}}
                              role="radio"
                              aria-checked={isSelected}
                              aria-label={`선택지 ${String.fromCharCode(65 + index)}: ${option}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base backdrop-blur-sm ${
                                  showAnswer && isCorrect
                                    ? 'bg-green-500/30 text-green-700 border border-green-500/30'
                                    : showAnswer && isSelected && !isCorrect
                                    ? 'bg-red-500/30 text-red-700 border border-red-500/30'
                                    : isSelected
                                    ? 'bg-orange-500/30 text-orange-700 border border-orange-500/30'
                                    : 'bg-white/50 text-slate-600 border border-white/50'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-slate-900 text-lg font-medium flex-1">{option}</span>
                                {showAnswer && isCorrect && (
                                  <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </motion.svg>
                                )}
                                {showAnswer && isSelected && !isCorrect && (
                                  <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                  </motion.svg>
                                )}
                              </div>
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* 설명 */}
                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-6 p-5 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl"
                          role="region"
                          aria-live="polite"
                        >
                          <p className="text-blue-900 text-sm leading-relaxed">
                            <strong className="text-blue-800">해설:</strong> {currentQuestion.explanation}
                          </p>
                        </motion.div>
                      )}

                      {/* 액션 버튼 */}
                      <div className="flex items-center justify-between mt-8">
                        <motion.button
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0 || isLoading}
                          className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 text-slate-700 hover:bg-white/80 hover:text-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                          whileHover={{ scale: currentQuestionIndex > 0 && !isLoading ? 1.05 : 1 }}
                          whileTap={{ scale: currentQuestionIndex > 0 && !isLoading ? 0.95 : 1 }}
                          aria-label="이전 문제"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>이전</span>
                        </motion.button>

                        {!showResult ? (
                          <motion.button
                            onClick={handleSubmitAnswer}
                            disabled={selectedAnswer === null || isLoading}
                            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            whileHover={{ scale: selectedAnswer !== null && !isLoading ? 1.05 : 1 }}
                            whileTap={{ scale: selectedAnswer !== null && !isLoading ? 0.95 : 1 }}
                            aria-label="답 제출"
                          >
                            {isLoading ? '처리 중...' : '답 제출'}
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={currentQuestionIndex < questions.length - 1 ? '다음 문제' : '시험 완료'}
                          >
                            {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '시험 완료'}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* 하단 모드 선택 */}
              {examMode === 'practice' && (
                <div className="px-8 py-6 border-t border-white/30 bg-white/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="text-slate-600 text-sm">
                      연습 모드: 시간 제한 없이 문제를 풀어보세요
                    </div>
                    <motion.button
                      onClick={handleStartExam}
                      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="시험 모드 시작"
                    >
                      시험 모드 시작
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 결과 모달 */}
      <QuizResultModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false)
          onClose()
        }}
        examType={examType}
        score={score}
        totalQuestions={questions.length}
        onRestart={() => {
          setShowResultModal(false)
          handleReset()
        }}
        onReview={() => {
          setShowResultModal(false)
          // 오답 노트로 이동 (첫 번째 오답 문제로)
          if (wrongAnswers.length > 0) {
            const firstWrongIndex = questions.findIndex(q => q.id === wrongAnswers[0].id)
            if (firstWrongIndex !== -1) {
              setCurrentQuestionIndex(firstWrongIndex)
              setSelectedAnswer(null)
              setShowResult(false)
            }
          }
        }}
      />

      <Toast toast={toast} onClose={hideToast} />
    </ErrorBoundary>
  )
}

export default QuizModal
