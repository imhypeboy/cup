import { motion } from 'framer-motion'

const About = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'GraphQL', level: 70 },
  ]

  return (
    <section id="about" className="py-20 px-6 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            사용자 경험을 중시하는 프론트엔드 개발자입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">안녕하세요 👋</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                모던 웹 기술을 활용하여 사용자에게 의미 있는 경험을 제공하는 것을 목표로 합니다.
                React와 TypeScript를 기반으로 확장 가능하고 유지보수하기 쉬운 코드를 작성합니다.
              </p>
              <p>
                새로운 기술을 배우고 공유하는 것을 좋아하며, 블로그를 통해 학습한 내용과 경험을 기록하고 있습니다.
              </p>
              <p>
                팀과의 협업을 중시하며, 코드 리뷰와 지식 공유를 통해 함께 성장하는 것을 추구합니다.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">{skill.name}</span>
                    <span className="text-gray-600 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-orange-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

