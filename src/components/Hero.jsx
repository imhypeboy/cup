import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  const navigate = useNavigate()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasVideo, setHasVideo] = useState(false)
  const videoRef = useRef(null)
  
  // 암기카드 앱 상태
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  
  // 선택된 옵션 (기본값: 정보처리기사 필기 카드의 옵션들)
  // 컬러: Forest Green
  // 반응형: Mobile First
  // 성능: Animation Focus
  // 인터랙션: Bounce Effect
  const [selectedOptions, setSelectedOptions] = useState({
    color: 'Forest Green',
    responsive: 'Mobile First',
    performance: 'Animation Focus',
    interaction: 'Bounce Effect'
  })

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
    }
  ]

  useEffect(() => {
    // 접근성: 사용자의 모션 감소 설정 확인
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 비디오 존재 여부 확인
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch('/demo.mp4', { method: 'HEAD' })
        if (response.ok) {
          setHasVideo(true)
        }
      } catch (error) {
        setHasVideo(false)
      }
    }
    checkVideo()
  }, [])

  // 카드 넘기기
  const handleCardSwipe = () => {
    setCurrentCardIndex((prev) => (prev + 1) % memoryCards.length)
  }

  // 옵션 선택
  const handleOptionSelect = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] text-slate-900 selection:bg-orange-100 font-sans">
      
      {/* ─── [1. Background Layer] 오로라 효과 (움직이는 배경) ─── */}
      <div 
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* 오로라 블롭 1: 보라색 */}
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
        
        {/* 오로라 블롭 2: 오렌지색 (2초 지연) */}
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
        
        {/* 오로라 블롭 3: 핑크색 (4초 지연) */}
        <motion.div
          className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"
          animate={prefersReducedMotion ? {} : {
            x: [0, 20, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 4,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ─── [2. Content Layer] 실제 콘텐츠 ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-40">
        
        {/* 2-1. Hero Section: 압도적인 타이포그래피 */}
        <div className="flex flex-col items-center text-center space-y-8 mb-32">
          
          {/* 뱃지: 글래스모피즘 효과 */}
          <motion.div
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/60 bg-white/40 backdrop-blur-md shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse" aria-hidden="true"></span>
            <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
              Available for Hire
            </span>
          </motion.div>

          {/* 메인 카피 */}
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Designing Logic, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600">
              Crafting Flutter.
            </span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl text-slate-500 font-medium leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            웹의 확장성을 이해하는 <strong>Next.js 엔지니어</strong>이자,<br />
            앱의 디테일을 놓치지 않는 <strong>Flutter 개발자</strong>입니다.
          </motion.p>
        </div>


        {/* 2-2. Showcase Section: 목업 + 설명 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left: iPhone 16 Pro Mockup Area */}
          <motion.div
            className="relative flex justify-center group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            
            {/* 후광 효과 (폰 뒤에서 빛남) */}
            <div 
              className="absolute inset-10 bg-gradient-to-tr from-orange-400 to-purple-500 blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity duration-700"
              aria-hidden="true"
            />

            {/* iPhone 16 Pro 프레임 컨테이너 (실제 iPhone처럼) */}
            <div className="relative w-[300px] h-[650px] bg-[#1a1a1a] rounded-[50px] shadow-[0_0_0_8px_#000,0_0_0_10px_#1a1a1a,0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
              
              {/* iPhone 16 Pro 다이나믹 아일랜드 (실제 디자인) */}
              <div 
                className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] z-40"
                aria-hidden="true"
              >
                {/* 다이나믹 아일랜드 외곽 (검은색 타원형, 실제처럼) */}
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {/* 다이나믹 아일랜드 내부 (센서 영역) */}
                  <div className="w-[100px] h-[28px] bg-slate-900/95 rounded-full flex items-center justify-center gap-2 px-3">
                    {/* 전면 카메라 */}
                    <div className="w-[6px] h-[6px] rounded-full bg-slate-700/80"></div>
                    {/* 센서 영역 */}
                    <div className="w-[20px] h-[4px] rounded-full bg-slate-800/70"></div>
                  </div>
                </div>
              </div>

              {/* 스크린 영역 (실제 iPhone 화면) */}
              <div className="w-full h-full bg-black relative overflow-hidden">
                
                {/* 실제 앱 콘텐츠 영역 */}
                <div className="absolute inset-0 pt-[54px] pb-[34px]">
                  {/* 비디오가 있으면 비디오 표시 */}
                  {hasVideo ? (
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      aria-label="Flutter 앱 데모 영상"
                      onLoadedData={() => {
                        if (videoRef.current) {
                          videoRef.current.style.display = 'block'
                        }
                      }}
                      onError={() => setHasVideo(false)}
                    >
                      <source src="/demo.mp4" type="video/mp4" />
                      <source src="/demo.webm" type="video/webm" />
                    </video>
                  ) : (
                    /* 정보처리기사 필기 암기카드 앱 UI */
                    <motion.div 
                      className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden cursor-pointer"
                      onClick={() => navigate('/memory-card')}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* 상단 상태바 영역 (실제 iPhone 스타일) */}
                      <div className="absolute top-0 left-0 right-0 h-[54px] flex items-center justify-between px-6 pt-[8px] z-20">
                        {/* 왼쪽: 시간 */}
                        <div className="text-white text-[15px] font-semibold leading-none">9:41</div>
                        
                        {/* 오른쪽: 신호, Wi-Fi, 배터리 */}
                        <div className="flex items-center gap-[4px]">
                          {/* 신호 강도 (실제 iPhone 스타일) */}
                          <div className="flex items-end gap-[2px]">
                            <div className="w-[3px] h-[4px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[5px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[6px] bg-white rounded-sm"></div>
                            <div className="w-[3px] h-[7px] bg-white rounded-sm"></div>
                          </div>
                          
                          {/* Wi-Fi 아이콘 */}
                          <svg className="w-[15px] h-[11px] text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                          </svg>
                          
                          {/* 배터리 (실제 iPhone 스타일) */}
                          <div className="relative w-[27px] h-[12px]">
                            <div className="absolute inset-0 border border-white rounded-[2.5px]"></div>
                            <div className="absolute left-[1.5px] top-[1.5px] bottom-[1.5px] w-[19px] bg-white rounded-[1px]"></div>
                            <div className="absolute right-[-3px] top-[3.5px] w-[1.5px] h-[5px] bg-white rounded-r-sm"></div>
                            <span className="absolute left-[3px] top-[1px] text-[8px] text-black font-bold leading-none">67</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 뒤로가기 버튼 */}
                      <div className="absolute top-[54px] left-0 px-4 py-3 z-20">
                        <button 
                          className="text-white/90 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            // 뒤로가기 로직 (필요시 추가)
                          }}
                          aria-label="뒤로가기"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* 메인 콘텐츠 영역 - 암기카드 앱 */}
                      <div className="absolute inset-0 flex flex-col pt-[100px] pb-[100px] px-4">
                        <motion.div
                          key={currentCardIndex}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col"
                        >
                          {/* 제목 영역 */}
                          <div className="mb-6 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <h2 className="text-white text-lg font-semibold">선택된 옵션</h2>
                            </div>
                          </div>

                          {/* 옵션 리스트 */}
                          <div className="flex-1 space-y-3">
                            {memoryCards[currentCardIndex].options.map((option, index) => {
                              const isSelected = selectedOptions[option.key] === option.value
                              return (
                                <motion.div
                                  key={option.key}
                                  className={`relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border-2 transition-all duration-200 ${
                                    isSelected 
                                      ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                                      : 'border-slate-700/50 hover:border-slate-600'
                                  }`}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleOptionSelect(option.key, option.value)
                                  }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex items-center justify-between">
                                    {/* 왼쪽: 체크마크 + 레이블 */}
                                    <div className="flex items-center gap-3">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                        isSelected ? 'bg-green-500' : 'bg-slate-700'
                                      }`}>
                                        {isSelected && (
                                          <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </motion.svg>
                                        )}
                                      </div>
                                      <span className="text-white text-sm font-medium">{option.label}</span>
                                    </div>
                                    
                                    {/* 오른쪽: 값 */}
                                    <span className="text-white/90 text-sm font-semibold">{option.value}</span>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>

                          {/* 하단 인디케이터 */}
                          <div className="flex items-center justify-center gap-2 mt-6">
                            {memoryCards.map((_, index) => (
                              <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all ${
                                  index === currentCardIndex 
                                    ? 'w-8 bg-white' 
                                    : 'w-1.5 bg-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* 하단 홈 인디케이터 */}
                      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex flex-col items-center justify-end pb-4 z-20">
                        <div className="w-[134px] h-[5px] bg-white/30 rounded-full mb-2"></div>
                      </div>
                      
                      {/* 클릭 안내 오버레이 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 z-30 rounded-[45px]">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">
                          <p className="text-white text-sm font-semibold">클릭하여 앱 실행하기</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* 장식 요소: 떠다니는 카드 (Glass Card) */}
            <motion.div
              className="absolute -right-4 bottom-20 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hidden md:block"
              animate={prefersReducedMotion ? {} : {
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg" aria-hidden="true">🎨</div>
                <div>
                  <div className="text-xs text-white/60 font-medium">Render Engine</div>
                  <div className="text-sm font-bold text-white">Impeller</div>
                </div>
              </div>
            </motion.div>
          </motion.div>


          {/* Right: Description Area */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                정보처리기사 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
                  필기 암기카드
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Flutter</strong>로 구현한 인터랙티브 암기카드 앱입니다.
                  <strong className="text-slate-900"> CustomPainter</strong>와 <strong className="text-slate-900">BackdropFilter</strong>를 활용해
                  몽환적인 글래스모피즘 UI를 완벽하게 구현했습니다.
                </p>
                <p>
                  이미지 리소스 없이 <strong className="text-slate-900">순수 코드</strong>로만 렌더링하여,
                  어떤 해상도에서도 선명하고 부드러운 <strong className="text-slate-900">벡터 기반 인터랙션</strong>을 제공합니다.
                  카드를 터치하면 다음 문제로 넘어가며, 옵션을 선택하면 실시간으로 피드백이 표시됩니다.
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-purple-50 rounded-full border border-orange-200/50">
                    <span className="text-sm font-semibold text-slate-700">✨ 실시간 인터랙션</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm font-semibold text-slate-700">🎯 벡터 기반 렌더링</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Framework", desc: "Flutter 3.x", icon: "📱" },
                { title: "Language", desc: "Dart 3", icon: "💙" },
                { title: "UI Effect", desc: "Glassmorphism", icon: "✨" },
                { title: "Animation", desc: "Bounce Effect", icon: "🎯" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      {item.title}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-slate-800">{item.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <motion.a
                href="#projects"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full hover:from-orange-600 hover:to-purple-700 hover:shadow-lg hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('projects')
                  if (element) {
                    const headerHeight = 80
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    window.scrollTo({ top: elementPosition - headerHeight, behavior: 'smooth' })
                  }
                }}
              >
                프로젝트 보기
                <svg 
                  className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
