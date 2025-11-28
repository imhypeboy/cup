import { motion } from 'framer-motion'

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'React 19의 새로운 기능들',
      excerpt: 'React 19에서 추가된 새로운 기능들과 개선사항을 살펴봅니다.',
      date: '2024.01.15',
      category: 'React',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'TypeScript로 더 안전한 코드 작성하기',
      excerpt: 'TypeScript의 고급 타입 기능을 활용하여 버그를 줄이는 방법을 알아봅니다.',
      date: '2024.01.10',
      category: 'TypeScript',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Tailwind CSS로 빠르게 UI 구축하기',
      excerpt: 'Tailwind CSS의 유틸리티 클래스를 활용한 효율적인 스타일링 방법을 공유합니다.',
      date: '2024.01.05',
      category: 'CSS',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Next.js 14 App Router 완전 정복',
      excerpt: 'Next.js 14의 App Router를 활용한 서버 컴포넌트와 클라이언트 컴포넌트의 차이점을 설명합니다.',
      date: '2024.01.01',
      category: 'Next.js',
      readTime: '10 min read',
    },
    {
      id: 5,
      title: 'Framer Motion으로 부드러운 애니메이션 만들기',
      excerpt: 'Framer Motion을 사용하여 사용자 경험을 향상시키는 애니메이션 기법을 소개합니다.',
      date: '2023.12.28',
      category: 'Animation',
      readTime: '7 min read',
    },
    {
      id: 6,
      title: '웹 성능 최적화 실전 가이드',
      excerpt: 'Core Web Vitals를 개선하고 사용자 경험을 향상시키는 실전 최적화 기법을 다룹니다.',
      date: '2023.12.25',
      category: 'Performance',
      readTime: '12 min read',
    },
  ]

  const categories = ['All', 'React', 'TypeScript', 'Next.js', 'CSS', 'Animation', 'Performance']

  return (
    <section id="blog" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog
          </h2>
          <p className="text-lg text-gray-600">
            개발 경험과 학습 내용을 공유합니다
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 text-xs">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{post.readTime}</span>
                <motion.a
                  href="#"
                  className="text-orange-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

