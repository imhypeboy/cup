import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizData, examTypes, saveProgress, saveScore, getStatistics } from '../data/quizData'
import { useToast } from '../hooks/useToast'
import Toast from './common/Toast'

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

  const questions = quizData[examType] || []
  const currentQuestion = questions[currentQuestionIndex]
  const statistics = getStatistics(examType)

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 상태 초기화
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setAnsweredQuestions(new Set())
      setExamMode('practice')
      setTimeRemaining(null)
    }
  }, [isOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleExamComplete = () => {
    saveScore(examType, score, questions.length)
    showToast('시험이 완료되었습니다!', 'success')
    setExamMode('practice')
    setTimeRemaining(null)
  }

  // 시험 모드일 때 타이머 설정
  useEffect(() => {
    if (examMode === 'exam' && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleExamComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [examMode, timeRemaining, examType, score, questions.length])

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      showToast('답을 선택해주세요.', 'error')
      return
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setShowResult(true)

    saveProgress(examType, currentQuestion.id, selectedAnswer, isCorrect)

    if (isCorrect) {
      setScore((prev) => prev + 1)
      showToast('정답입니다! 🎉', 'success')
    } else {
      showToast('오답입니다. 다시 생각해보세요.', 'error')
    }

    setAnsweredQuestions((prev) => new Set([...prev, currentQuestion.id]))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      saveScore(examType, score, questions.length)
      showToast('모든 문제를 완료했습니다!', 'success')
      if (examMode === 'exam') {
        handleExamComplete()
      }
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleStartExam = () => {
    setExamMode('exam')
    setTimeRemaining(questions.length * 60)
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnsweredQuestions(new Set())
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    setExamMode('practice')
    setTimeRemaining(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = currentQuestion ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  if (!isOpen) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop - 글래스모피즘 */}
            <motion.div
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal - 글래스모피즘 스타일 */}
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
                aria-label="닫기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 헤더 */}
              <div className="px-8 pt-8 pb-6 border-b border-white/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* 시험 선택 */}
                    <select
                      value={examType}
                      onChange={(e) => {
                        setExamType(e.target.value)
                        handleReset()
                      }}
                      className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold shadow-sm hover:bg-white/80 transition-all"
                    >
                      {Object.values(examTypes).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {/* 타이머 (시험 모드) */}
                    {examMode === 'exam' && timeRemaining !== null && (
                      <div className="px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl">
                        <span className="text-red-600 text-sm font-bold">{formatTime(timeRemaining)}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-slate-600 text-sm font-medium">
                    정답률: <span className="text-slate-900 font-bold">{statistics.accuracy}%</span> ({statistics.correct}/{statistics.answered})
                  </div>
                </div>

                {/* 진행률 바 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 text-sm font-medium">
                      문제 {currentQuestionIndex + 1} / {questions.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
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
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-relaxed">
                        {currentQuestion.question}
                      </h2>

                      {/* 선택지 */}
                      <div className="space-y-3 mb-8">
                        {currentQuestion.options.map((option, index) => {
                          const isSelected = selectedAnswer === index
                          const isCorrect = index === currentQuestion.correctAnswer
                          const showAnswer = showResult

                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showResult}
                              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 backdrop-blur-sm ${
                                showAnswer && isCorrect
                                  ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/10'
                                  : showAnswer && isSelected && !isCorrect
                                  ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/10'
                                  : isSelected
                                  ? 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/10'
                                  : 'bg-white/40 border-white/50 hover:bg-white/60 hover:border-white/70'
                              }`}
                              whileHover={!showResult ? { scale: 1.01, x: 4 } : {}}
                              whileTap={!showResult ? { scale: 0.99 } : {}}
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
                          disabled={currentQuestionIndex === 0}
                          className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 text-slate-700 hover:bg-white/80 hover:text-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                          whileHover={{ scale: currentQuestionIndex > 0 ? 1.05 : 1 }}
                          whileTap={{ scale: currentQuestionIndex > 0 ? 0.95 : 1 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>이전</span>
                        </motion.button>

                        {!showResult ? (
                          <motion.button
                            onClick={handleSubmitAnswer}
                            disabled={selectedAnswer === null}
                            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: selectedAnswer !== null ? 1.05 : 1 }}
                            whileTap={{ scale: selectedAnswer !== null ? 0.95 : 1 }}
                          >
                            답 제출
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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
                  <div className="flex items-center justify-between">
                    <div className="text-slate-600 text-sm">
                      연습 모드: 시간 제한 없이 문제를 풀어보세요
                    </div>
                    <motion.button
                      onClick={handleStartExam}
                      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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

      <Toast toast={toast} onClose={hideToast} />
    </>
  )
}

export default QuizModal

