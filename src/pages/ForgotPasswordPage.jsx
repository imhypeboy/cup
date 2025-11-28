import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import Toast from '../components/common/Toast'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { resetPassword } = useAuth()
  const { toast, showToast, hideToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const result = resetPassword(email)
    if (result.success) {
      setMessage(result.message)
      setEmail('')
      showToast('비밀번호 재설정 정보를 확인하세요.', 'success')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              <div className="w-6 h-6 bg-orange-600 rounded-sm"></div>
              <div className="w-6 h-6 bg-orange-500 rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">Portfolio</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">비밀번호 찾기</h1>
          <p className="text-gray-600 mb-6 text-center">등록된 이메일을 입력하세요</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-900 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              비밀번호 재설정
            </motion.button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/login"
              className="block text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              로그인으로 돌아가기
            </Link>
            <Link
              to="/"
              className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </motion.div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  )
}

export default ForgotPasswordPage

