import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import { useNetworkStatus } from '../hooks/useNetworkStatus'
import Toast from '../components/common/Toast'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const isOnline = useNetworkStatus()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!isOnline) {
      showToast('네트워크 연결을 확인해주세요.', 'error')
      return
    }

    // 클라이언트 검증
    if (!email.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }

    if (!email.includes('@')) {
      setError('올바른 이메일 형식을 입력해주세요.')
      return
    }

    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        showToast('로그인되었습니다.', 'success')
        navigate('/')
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.')
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error)
      }
    } finally {
      setIsLoading(false)
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

          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">로그인</h1>
          <p className="text-gray-600 mb-6 text-center">계정에 로그인하세요</p>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-900 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-900 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
              >
                비밀번호 찾기
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !isOnline}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              계정이 없으신가요?{' '}
              <Link
                to="/signup"
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                회원가입
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
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

export default LoginPage

