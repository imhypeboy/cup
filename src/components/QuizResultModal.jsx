import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import { getStatistics } from '../data/quizData'

const QuizResultModal = ({ isOpen, onClose, examType, score, totalQuestions, onRestart, onReview }) => {
  const statistics = useMemo(() => getStatistics(examType), [examType])
  
  const percentage = useMemo(() => {
    return Math.round((score / totalQuestions) * 100)
  }, [score, totalQuestions])

  const getGrade = (percentage) => {
    if (percentage >= 90) return { text: '우수', color: 'text-green-600', bg: 'bg-green-500/20', border: 'border-green-500/30' }
    if (percentage >= 70) return { text: '양호', color: 'text-blue-600', bg: 'bg-blue-500/20', border: 'border-blue-500/30' }
    if (percentage >= 60) return { text: '보통', color: 'text-orange-600', bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
    return { text: '미흡', color: 'text-red-600', bg: 'bg-red-500/20', border: 'border-red-500/30' }
  }

  const grade = getGrade(percentage)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-2xl border border-white/50 p-8"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/90 transition-all"
              aria-label="닫기"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 결과 내용 */}
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">시험 완료!</h2>
                <p className="text-slate-600">{examType}</p>
              </div>

              {/* 점수 표시 */}
              <div className="relative">
                <motion.div
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${grade.bg} ${grade.border} border-4`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${grade.color}`}>{percentage}%</div>
                    <div className={`text-sm font-semibold ${grade.color}`}>{grade.text}</div>
                  </div>
                </motion.div>
              </div>

              {/* 상세 통계 */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl font-bold text-slate-900">{score}</div>
                  <div className="text-sm text-slate-600 mt-1">정답</div>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl font-bold text-slate-900">{totalQuestions - score}</div>
                  <div className="text-sm text-slate-600 mt-1">오답</div>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                  <div className="text-2xl font-bold text-slate-900">{totalQuestions}</div>
                  <div className="text-sm text-slate-600 mt-1">전체</div>
                </div>
              </div>

              {/* 전체 통계 */}
              {statistics.answered > 0 && (
                <div className="pt-4 border-t border-white/30">
                  <p className="text-sm text-slate-600 mb-2">전체 학습 통계</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-slate-700">
                      정답률: <strong className="text-slate-900">{statistics.accuracy}%</strong>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-700">
                      풀이한 문제: <strong className="text-slate-900">{statistics.answered}</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex items-center justify-center gap-4 pt-6">
                <motion.button
                  onClick={onReview}
                  className="px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 text-slate-700 hover:bg-white/80 transition-all font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  오답 노트
                </motion.button>
                <motion.button
                  onClick={onRestart}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  다시 풀기
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default QuizResultModal

