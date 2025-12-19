import { motion } from 'framer-motion'
import { useState } from 'react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: '대학생 시간표/학사 일정 통합 웹 서비스',
      description: '시간표, 학사 일정, 과목 관리를 하나의 흐름으로 통합한 웹 서비스',
      summary: [
        '반복적인 시간표 구성과 일정 관리 부담을 줄이는 사용자 중심 서비스',
        '기획부터 개발, 배포까지 집중 수행한 단기 팀 프로젝트',
      ],
      role: [
        '3인 팀 프로젝트에서 프론트엔드 개발 및 UI·UX 설계 전담',
        '메인 페이지 구조 설계, 컴포넌트 분리, 상태 관리 구현',
      ],
      impact: [
        '시간표 자동 생성 기능으로 사용자 입력 단계 간소화',
        '인증 상태 기반 화면 제어 및 즉각적 피드백 UI 구성',
        '기능 밀도가 높은 서비스에서도 화면 복잡도 최소화',
      ],
      period: '2025.07 – 2025.08',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      image: '/project-haksamate.png', // 프로젝트 대표 이미지 경로 (.png 또는 .jpg 지원)
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      link: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: '실시간 협업을 위한 태스크 관리 애플리케이션',
      summary: [
        '팀 단위 협업을 위한 프로젝트·일정·태스크 통합 관리 서비스',
        '진행 상황을 한눈에 파악할 수 있는 대시보드 중심 설계',
      ],
      role: [
        '총 4명 팀 프로젝트',
        '프론트엔드 개발 및 UI 디자인 담당',
        '대시보드, 태스크 관리 화면 구현',
      ],
      coreTasks: [
        '프로젝트·태스크 상태 시각화 UI 구현',
        '캘린더 기반 일정 관리 기능 개발',
        '다크모드 적용 및 사용자 시선 흐름 고려한 레이아웃 설계',
      ],
      impact: [
        '프로젝트 진행 상태 인지 속도 개선',
        '협업 상황 파악을 위한 정보 구조 명확화',
        '팀원 간 커뮤니케이션 비용 감소',
      ],
      period: '2025.02',
      tech: ['React', 'TypeScript', 'Spring Boot', 'Java', 'MariaDB', 'Redis', 'CSS 3', 'Vite'],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      link: '#',
    },
    {
      id: 3,
      title: '의료 영상 DICOM 뷰어',
      description: '의료 영상 표준 DICOM 데이터를 웹에서 조회·조작하는 뷰어',
      summary: [
        '의료 영상 표준 DICOM 데이터를 웹에서 조회·조작하는 뷰어 개발',
        '의료진 실제 업무 흐름을 기준으로 UX 설계',
      ],
      role: [
        '총 3명 팀 프로젝트',
        '프론트엔드 UI 설계 및 구현 담당',
        '환자 검색부터 영상 조회까지 전체 화면 흐름 구성',
      ],
      coreTasks: [
        '환자 검색 → Study 선택 → 영상 조회 UX 설계',
        '영상 확대·회전·윈도우 레벨·어노테이션 UI 구현',
        'CornerstoneJS 기반 DICOM 데이터 시각화',
      ],
      reflection: '프로젝트를 통해 의료용 뷰어는 단순히 이미지를 보여주는 것이 아니라, 의료진이 직관적으로 조작할 수 있는 UI와 빠른 반응성이 핵심이라는 점을 알게 되었다. 특히 환자 검색 → Study 선택 → 영상 조회의 과정을 최대한 단순화 하는 것이 중요하다는 것을 경험했다. 이를 통해 디자인은 단순히 예쁘게 만드는 것이 아니라, 업무 효율성을 높이는 실질적인 도구여야 한다는 점을 느꼈다.',
      impact: [
        '기능 밀도가 높은 환경에서도 조작 흐름 유지',
        '의료진 사용 맥락을 반영한 인터페이스 완성',
        '복잡한 영상 기능의 학습 부담 최소화',
      ],
      period: '2025.08',
      tech: ['React', 'TypeScript', 'CornerstoneJS', 'DICOM'],
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      link: '#',
    },
    {
      id: 4,
      title: 'AI 기반 성격유형 매칭 서비스',
      description: '성격유형 분석과 AI를 활용해 자기소개글을 자동 생성하는 매칭 서비스',
      summary: [
        '성격유형 분석과 AI를 활용해 자기소개글을 자동 생성하는 매칭 서비스',
        '사용자 입력 부담을 줄이고 매칭 품질을 높이기 위한 AI 기반 서비스 기획 및 구현',
      ],
      role: [
        '산학연계 캡스톤 디자인 프로젝트',
        '총 5명 참여 (학부생 4명, 기업 멘토 1명)',
        '팀 프로젝트 참여',
        '프론트엔드 UI·UX 설계 및 서비스 기획 참여',
      ],
      coreTasks: [
        '성격유형 기반 프로필 작성 흐름 설계',
        'AI 자기소개글 자동 생성 기능 서비스 구조 기획',
        '매칭 카드 스와이프 인터랙션 UI 설계',
        '다크모드 및 글래스모피즘 디자인 적용',
        '사용자 가입 및 프로필 작성 과정 단순화',
      ],
      impact: [
        '자기소개글 작성 부담을 줄여 사용자 진입 장벽 완화',
        '성향 기반 추천 구조로 매칭 경험의 개인화 강화',
        'AI 기반 서비스 기획 및 실제 구현 경험 확보',
      ],
      period: '2025.03 ~ 2025.06',
      tech: ['React', 'Firebase', 'Material-UI', 'Redux'],
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      link: '#',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: '개인 포트폴리오 웹사이트 (현재 사이트)',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      link: '#',
    },
    {
      id: 6,
      title: 'Weather App',
      description: '실시간 날씨 정보를 제공하는 PWA 애플리케이션',
      tech: ['React', 'PWA', 'OpenWeather API', 'Service Worker'],
      color: 'bg-gradient-to-br from-pink-500 to-rose-500',
      link: '#',
    },
  ]

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const [imageSources, setImageSources] = useState({})

  // 이미지 경로에서 확장자를 제거하고 .png와 .jpg 둘 다 시도
  const getImageSource = (projectId, imagePath) => {
    if (!imagePath) return null
    if (imageSources[projectId]) return imageSources[projectId]
    
    // 확장자 제거
    const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '')
    // .png를 먼저 시도
    return `${basePath}.png`
  }

  const handleImageError = (projectId, imagePath) => {
    const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '')
    const currentExt = imagePath.match(/\.(jpg|jpeg|png)$/i)?.[0]?.toLowerCase()
    
    // .png가 실패했으면 .jpg 시도, .jpg가 실패했으면 에러 상태로
    if (currentExt === '.png' || currentExt === '.PNG') {
      setImageSources(prev => ({ ...prev, [projectId]: `${basePath}.jpg` }))
    } else {
      setImageErrors(prev => ({ ...prev, [projectId]: true }))
    }
  }

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <p className="text-lg text-gray-600">
            최근 작업한 프로젝트들을 소개합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image/Color */}
              <div className={`h-48 ${project.color} flex items-center justify-center relative overflow-hidden`}>
                {project.image && !imageErrors[project.id] ? (
                  <>
                    <img 
                      src={imageSources[project.id] || getImageSource(project.id, project.image) || project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={() => {
                        handleImageError(project.id, imageSources[project.id] || project.image)
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </>
                ) : (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-white text-4xl font-bold z-10">{project.id}</span>
                  </>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="text-orange-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Overlay */}
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h3>
                  {selectedProject.period && (
                    <p className="text-sm text-gray-500">{selectedProject.period}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">요약</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {(selectedProject.summary || [selectedProject.description]).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {selectedProject.role && (
                  <div>
                    <h4 className="font-semibold mb-2">역할</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProject.role.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.coreTasks && (
                  <div>
                    <h4 className="font-semibold mb-2">핵심 작업</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProject.coreTasks.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.reflection && (
                  <div>
                    <h4 className="font-semibold mb-2">느낀점</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedProject.reflection}
                    </p>
                  </div>
                )}

                {selectedProject.impact && (
                  <div>
                    <h4 className="font-semibold mb-2">성과</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProject.impact.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">기술 스택</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects

