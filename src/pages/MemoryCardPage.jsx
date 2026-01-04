import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../hooks/useToast'
import Toast from '../components/common/Toast'

const MemoryCardPage = () => {
  const navigate = useNavigate()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({
    color: 'Forest Green',
    responsive: 'Mobile First',
    performance: 'Animation Focus',
    interaction: 'Bounce Effect'
  })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  // 카드별 색상 팔레트
  const cardColors = [
    ['bg-orange-500', 'bg-orange-400'], // 정보처리기사
    ['bg-red-600', 'bg-red-500'], // 데이터베이스
    ['bg-green-500', 'bg-green-400'], // 알고리즘
    ['bg-blue-500', 'bg-blue-400'], // 네트워크
    ['bg-amber-600', 'bg-amber-500'] // 운영체제
  ]

  // 암기카드 데이터
  const memoryCards = [
    {
      question: '정보처리기사 필기',
      options: [
        { label: '컬러', value: 'Forest Green', key: 'color' },
        { label: '반응형', value: 'Mobile First', key: 'responsive' },
        { label: '성능', value: 'Animation Focus', key: 'performance' },
        { label: '인터랙션', value: 'Bounce Effect', key: 'interaction' }
      ]
    },
    {
      question: '데이터베이스 설계',
      options: [
        { label: '정규화', value: '3NF', key: 'normalization' },
        { label: '인덱스', value: 'B-Tree', key: 'index' },
        { label: '트랜잭션', value: 'ACID', key: 'transaction' },
        { label: '무결성', value: 'Referential', key: 'integrity' }
      ]
    },
    {
      question: '알고리즘',
      options: [
        { label: '정렬', value: 'Quick Sort', key: 'sort' },
        { label: '탐색', value: 'Binary Search', key: 'search' },
        { label: '그래프', value: 'DFS/BFS', key: 'graph' },
        { label: '동적계획', value: 'DP', key: 'dp' }
      ]
    },
    {
      question: '네트워크',
      options: [
        { label: '프로토콜', value: 'TCP/IP', key: 'protocol' },
        { label: '포트', value: '80, 443', key: 'port' },
        { label: 'OSI 모델', value: '7 Layer', key: 'osi' },
        { label: '보안', value: 'SSL/TLS', key: 'security' }
      ]
    },
    {
      question: '운영체제',
      options: [
        { label: '스케줄링', value: 'Round Robin', key: 'scheduling' },
        { label: '메모리', value: 'Virtual Memory', key: 'memory' },
        { label: '파일시스템', value: 'NTFS, ext4', key: 'filesystem' },
        { label: '프로세스', value: 'Fork/Exec', key: 'process' }
      ]
    }
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 카드 넘기기
  const handleCardSwipe = (direction = 'next') => {
    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % memoryCards.length)
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + memoryCards.length) % memoryCards.length)
    }
  }

  // 옵션 선택
  const handleOptionSelect = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        handleCardSwipe('next')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handleCardSwipe('prev')
      } else if (e.key === 'Escape') {
        navigate('/')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentCardIndex])

  const currentColors = cardColors[currentCardIndex]
  const optionColors = [
    'bg-orange-500',
    'bg-red-600',
    'bg-green-500',
    'bg-blue-500'
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 헤더 */}
        <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-200">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">뒤로가기</span>
          </motion.button>

          <div className="text-slate-500 text-sm font-semibold">
            {currentCardIndex + 1} <span className="text-slate-400">/</span> {memoryCards.length}
          </div>
        </header>

        {/* 상단 배너 영역 */}
        <div className={`relative ${currentColors[0]} overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="relative px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white">선택된 옵션</h1>
              </div>
              <p className="text-white/90 text-lg font-medium ml-11">{memoryCards[currentCardIndex].question}</p>
            </div>
          </div>
        </div>

        {/* 메인 카드 영역 */}
        <div className="flex-1 bg-slate-50 px-6 py-8">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {memoryCards[currentCardIndex].options.map((option, index) => {
                  const isSelected = selectedOptions[option.key] === option.value
                  const cardColor = optionColors[index % optionColors.length]
                  
                  return (
                    <motion.div
                      key={option.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      onClick={() => handleOptionSelect(option.key, option.value)}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${
                        isSelected ? 'ring-4 ring-emerald-400 ring-offset-2' : ''
                      }`}
                    >
                      {/* 상단 색상 영역 */}
                      <div className={`${cardColor} h-32 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div 
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-white shadow-lg' 
                                    : 'bg-white/30 backdrop-blur-sm'
                                }`}
                                animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                                transition={{ duration: 0.4 }}
                              >
                                {isSelected && (
                                  <motion.svg
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </motion.svg>
                                )}
                              </motion.div>
                              <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                {option.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 하단 텍스트 영역 */}
                      <div className="bg-white p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 text-xs font-medium uppercase tracking-wide">
                            {memoryCards[currentCardIndex].question}
                          </span>
                          <span className={`text-lg font-bold transition-colors ${
                            isSelected ? 'text-emerald-600' : 'text-slate-900'
                          }`}>
                            {option.value}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* 하단 인디케이터 */}
            <div className="flex items-center justify-center gap-2.5 mt-8">
              {memoryCards.map((_, index) => (
                <motion.button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentCardIndex 
                      ? 'w-10 bg-slate-900' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentCardIndex(index)}
                  aria-label={`카드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="px-6 py-6 flex items-center justify-between bg-white border-t border-slate-200">
          <motion.button
            onClick={() => handleCardSwipe('prev')}
            className="flex items-center gap-2.5 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>이전</span>
          </motion.button>

          <div className="text-slate-500 text-xs text-center space-y-0.5">
            <p className="font-medium">키보드: ← → 또는 스페이스바로 이동</p>
            <p className="text-slate-400">ESC: 홈으로 돌아가기</p>
          </div>

          <motion.button
            onClick={() => handleCardSwipe('next')}
            className="flex items-center gap-2.5 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>다음</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Toast 알림 */}
      <Toast toast={toast} onClose={hideToast} />
    </div>
  )
}

export default MemoryCardPage
