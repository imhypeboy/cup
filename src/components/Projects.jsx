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
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      link: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: '실시간 협업을 위한 태스크 관리 애플리케이션',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      link: '#',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: '데이터 시각화와 분석을 위한 대시보드',
      tech: ['React', 'D3.js', 'GraphQL', 'PostgreSQL'],
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      link: '#',
    },
    {
      id: 4,
      title: 'Social Media Platform',
      description: '소셜 네트워킹을 위한 모던 웹 애플리케이션',
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
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-white text-4xl font-bold z-10">{project.id}</span>
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

