import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { storageAPI } from '../../utils/api'
import { useToast } from '../../hooks/useToast'
import { useNetworkStatus } from '../../hooks/useNetworkStatus'
import Toast from '../common/Toast'

const BlogEditor = ({ isOpen, onClose, onPostCreated }) => {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('React')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const submitButtonRef = useRef(null)
  const { toast, showToast, hideToast } = useToast()
  const isOnline = useNetworkStatus()

  const categories = ['React', 'TypeScript', 'Next.js', 'CSS', 'Animation', 'Performance']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 중복 전송 방지
    if (isSubmitting) return

    // 클라이언트 검증
    if (!title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }

    if (title.trim().length < 3) {
      setError('제목은 최소 3자 이상이어야 합니다.')
      return
    }

    if (!excerpt.trim()) {
      setError('요약을 입력해주세요.')
      return
    }

    if (excerpt.trim().length < 10) {
      setError('요약은 최소 10자 이상이어야 합니다.')
      return
    }

    if (!content.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    if (content.trim().length < 50) {
      setError('내용은 최소 50자 이상이어야 합니다.')
      return
    }

    if (!isOnline) {
      showToast('네트워크 연결을 확인해주세요.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const newPost = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        date: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\./g, '').replace(/\s/g, '.'),
        readTime: `${Math.ceil(content.trim().length / 200)} min read`,
        author: user.name,
        authorEmail: user.email,
      }

      await storageAPI.createPost(newPost)
      
      showToast('글이 성공적으로 작성되었습니다.', 'success')
      
      // 폼 초기화
      setTitle('')
      setExcerpt('')
      setContent('')
      setCategory('React')
      
      // 부모 컴포넌트에 알림
      if (onPostCreated) {
        onPostCreated()
      }
      
      onClose()
    } catch (error) {
      const errorMessage = error.message || '글 작성 중 오류가 발생했습니다.'
      setError(errorMessage)
      showToast(errorMessage, 'error')
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Post creation error:', error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={isSubmitting ? undefined : onClose}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Close"
                disabled={isSubmitting}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">새 글 작성</h2>

              {!isOnline && (
                <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                  네트워크 연결이 없습니다.
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-900 mb-2">
                    제목 * (최소 3자)
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    minLength={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="글 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label htmlFor="post-excerpt" className="block text-sm font-medium text-gray-900 mb-2">
                    요약 * (최소 10자)
                  </label>
                  <textarea
                    id="post-excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                    minLength={10}
                    rows={2}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="글 요약을 입력하세요"
                  />
                </div>

                <div>
                  <label htmlFor="post-category" className="block text-sm font-medium text-gray-900 mb-2">
                    카테고리 *
                  </label>
                  <select
                    id="post-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-900 mb-2">
                    내용 * (최소 50자)
                  </label>
                  <textarea
                    id="post-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    minLength={50}
                    rows={12}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none font-mono text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="글 내용을 입력하세요..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    {content.length} 자 (예상 읽기 시간: {Math.ceil(content.length / 200)}분)
                    {content.length < 50 && (
                      <span className="text-red-500 ml-2">최소 50자 이상 입력해주세요.</span>
                    )}
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    취소
                  </motion.button>
                  <motion.button
                    ref={submitButtonRef}
                    type="submit"
                    disabled={isSubmitting || !isOnline || content.length < 50}
                    className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={!isSubmitting && isOnline && content.length >= 50 ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && isOnline && content.length >= 50 ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        작성 중...
                      </>
                    ) : (
                      '글 작성하기'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  )
}

export default BlogEditor
