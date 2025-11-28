import { motion } from 'framer-motion'
import { useState } from 'react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Next.js와 TypeScript로 구축한 풀스택 이커머스 플랫폼',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
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

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
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
              onClick={() => window.open(project.link, '_blank')}
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
                <motion.a
                  href={project.link}
                  className="text-orange-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

