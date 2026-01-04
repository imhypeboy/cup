import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../hooks/useToast'
import Toast from '../components/common/Toast'
import QuizModal from '../components/QuizModal'

const MemoryCardPage = () => {
  const navigate = useNavigate()
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  // 퀴즈 데이터
  const quizzes = [
    {
      question: '정보처리기사 필기 시험에서 데이터베이스 정규화의 목적은?',
      answer: '데이터 중복을 제거하고 데이터 무결성을 보장하기 위함입니다.',
      category: '데이터베이스'
    },
    {
      question: 'Flutter에서 CustomPainter를 사용하는 주요 목적은?',
      answer: '커스텀 그래픽과 애니메이션을 코드로 직접 그려서 벡터 기반 UI를 구현하기 위함입니다.',
      category: 'Flutter'
    },
    {
      question: 'BackdropFilter의 주요 기능은?',
      answer: '배경에 블러 효과를 적용하여 글래스모피즘 UI를 구현할 수 있습니다.',
      category: 'UI/UX'
    },
    {
      question: '정보처리기사 필기 시험의 합격 기준은?',
      answer: '각 과목 40점 이상, 전 과목 평균 60점 이상입니다.',
      category: '정보처리기사'
    }
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleQuizClick = () => {
    if (!showAnswer) {
      setShowAnswer(true)
    } else {
      setShowAnswer(false)
      setCurrentQuizIndex((prev) => (prev + 1) % quizzes.length)
    }
  }

  const handleNextQuiz = () => {
    setShowAnswer(false)
    setCurrentQuizIndex((prev) => (prev + 1) % quizzes.length)
  }

  const handlePrevQuiz = () => {
    setShowAnswer(false)
    setCurrentQuizIndex((prev) => (prev - 1 + quizzes.length) % quizzes.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#FAFAFA]"
    >
      {/* ─── [섹션 1] 프로젝트 히어로 ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
        {/* 배경 오로라 효과 (메인과 동일) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"
            animate={prefersReducedMotion ? {} : {
              x: [0, 30, -20, 0],
              y: [0, -50, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"
            animate={prefersReducedMotion ? {} : {
              x: [0, -30, 20, 0],
              y: [0, 50, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* 좌측: 텍스트 설명 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* 카테고리 배지 */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50">
              <span className="text-sm font-semibold text-orange-600 tracking-wide uppercase">APP PROJECT</span>
            </div>

            {/* 타이틀 */}
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-900">
              정보처리기사<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600">
                필기 암기카드
              </span>
            </h1>

            {/* 한 줄 요약 */}
            <p className="text-xl text-slate-600 font-medium">
              Flutter로 구현한 직관적인 인터랙티브 암기카드 앱입니다.
            </p>

            {/* 설명 */}
            <div className="space-y-4 text-lg text-slate-500 leading-relaxed">
              <p>
                <strong className="text-slate-900">CustomPainter</strong>와 <strong className="text-slate-900">BackdropFilter</strong>를 
                활용해 세련된 글래스모피즘 UI를 구현했습니다.
              </p>
              <p>
                순수 코드로 렌더링된 부드러운 인터랙션을 경험해보세요.
              </p>
            </div>

            {/* 뒤로가기 버튼 */}
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mt-8"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">홈으로 돌아가기</span>
            </motion.button>
          </motion.div>

          {/* 우측: iPhone 목업 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* 후광 효과 */}
            <div className="absolute inset-10 bg-gradient-to-tr from-orange-400 to-purple-500 blur-[80px] opacity-50"></div>

            {/* iPhone 16 Pro 프레임 */}
            <div className="relative w-[300px] h-[650px] bg-[#1a1a1a] rounded-[50px] shadow-[0_0_0_8px_#000,0_0_0_10px_#1a1a1a,0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* 다이나믹 아일랜드 */}
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] z-40">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  <div className="w-[100px] h-[28px] bg-slate-900/95 rounded-full flex items-center justify-center gap-2 px-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-slate-700/80"></div>
                    <div className="w-[20px] h-[4px] rounded-full bg-slate-800/70"></div>
                  </div>
                </div>
              </div>

              {/* 스크린 영역 - 글래스모피즘 메인 화면 */}
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden">
                <div className="absolute inset-0 pt-[54px] pb-[34px]">
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    {/* 글래스모피즘 UI */}
                    <div className="absolute inset-0 backdrop-blur-sm">
                      {/* 상단 상태바 */}
                      <div className="absolute top-0 left-0 right-0 h-[44px] flex items-center justify-between px-6 pt-2 z-20">
                        <div className="text-white text-[15px] font-semibold">9:41</div>
                        <div className="flex items-center gap-[4px]">
                          <div className="flex items-end gap-[2px]">
                            <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[5px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[7px] bg-white rounded-sm"></div>
                          </div>
                          <svg className="w-[15px] h-[11px] text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                          </svg>
                          <div className="relative w-[27px] h-[12px]">
                            <div className="absolute inset-0 border border-white rounded-[2.5px]"></div>
                            <div className="absolute left-[1.5px] top-[1.5px] bottom-[1.5px] w-[19px] bg-white rounded-[1px]"></div>
                            <div className="absolute right-[-3px] top-[3.5px] w-[1.5px] h-[5px] bg-white rounded-r-sm"></div>
                            <span className="absolute left-[3px] top-[1px] text-[8px] text-black font-bold">67</span>
                          </div>
                        </div>
                      </div>

                      {/* 메인 콘텐츠 - 글래스모피즘 카드들 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-[60px] pb-8">
                        <div className="w-full max-w-[240px] space-y-4">
                          <motion.div
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="text-white text-sm font-semibold mb-2">정보처리기사</div>
                            <div className="text-white/70 text-xs">필기 암기카드</div>
                          </motion.div>

                          <motion.div
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 shadow-md"></div>
                              <div className="flex-1">
                                <div className="text-white text-xs font-medium">CustomPainter</div>
                                <div className="text-white/60 text-[10px]">Vector Graphics</div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* 하단 홈 인디케이터 */}
                      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex flex-col items-center justify-end pb-4 z-20">
                        <div className="w-[134px] h-[5px] bg-white/30 rounded-full mb-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── [섹션 2] 핵심 기능: 퀴즈 인터페이스 ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              직관적인 카드형 퀴즈 인터페이스
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              실제 시험처럼 문제를 풀고 즉시 정답을 확인할 수 있습니다. 
              직관적인 UI로 학습 효율을 높였습니다.
            </p>
          </motion.div>

          {/* 퀴즈 카드 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${
                  index === currentQuizIndex ? 'ring-4 ring-orange-400 ring-offset-2' : ''
                }`}
                onClick={index === currentQuizIndex ? handleQuizClick : () => setCurrentQuizIndex(index)}
                whileHover={{ scale: index === currentQuizIndex ? 1 : 1.02, y: -4 }}
              >
                {/* 상단 색상 영역 */}
                <div className={`h-40 ${
                  index === 0 ? 'bg-orange-500' :
                  index === 1 ? 'bg-purple-500' :
                  index === 2 ? 'bg-blue-500' :
                  'bg-green-500'
                } relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {quiz.category}
                      </span>
                      {index === currentQuizIndex && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 하단 텍스트 영역 */}
                <div className="bg-white p-6">
                  <div className="space-y-3">
                    <p className="text-slate-900 font-semibold text-lg leading-relaxed">
                      {quiz.question}
                    </p>
                    {index === currentQuizIndex && showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-3 border-t border-slate-200"
                      >
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {quiz.answer}
                        </p>
                      </motion.div>
                    )}
                    {index === currentQuizIndex && !showAnswer && (
                      <p className="text-orange-600 text-sm font-medium">클릭하여 정답 보기</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 퀴즈 네비게이션 */}
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <motion.button
                onClick={handlePrevQuiz}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                이전 문제
              </motion.button>
              <motion.button
                onClick={handleNextQuiz}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all font-medium shadow-lg shadow-orange-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다음 문제
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── [섹션 3] 기술 스택 ─── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              기술 스택
            </h2>
            <p className="text-xl text-slate-600">
              프로젝트에 사용된 주요 기술들입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Framework", desc: "Flutter 3.x", icon: "📱" },
              { title: "Language", desc: "Dart 3", icon: "💙" },
              { title: "State Mgmt", desc: "Riverpod", icon: "🔄" },
              { title: "Key Tech", desc: "CustomPainter", icon: "🎨" },
              { title: "UI Effect", desc: "BackdropFilter", icon: "✨" },
              { title: "Animation", desc: "Hero Animation", icon: "🎯" },
              { title: "Rendering", desc: "Vector Graphics", icon: "🖼️" },
              { title: "Platform", desc: "iOS / Android", icon: "📲" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                  {item.title}
                </div>
                <div className="text-lg font-bold text-slate-900">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── [섹션 4] CTA ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              더 자세히 알아보기
            </h2>
            <p className="text-xl text-slate-600">
              소스 코드를 확인하거나 프로젝트에 대해 더 알아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setShowQuizModal(true)}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                퀴즈 앱 실행하기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                소스 코드 보러 가기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toast 알림 */}
      <Toast toast={toast} onClose={hideToast} />

      {/* 퀴즈 모달 */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        initialExamType="정보처리기사"
      />
    </motion.div>
  )
}

export default MemoryCardPage
