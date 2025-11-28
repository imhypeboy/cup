import { createContext, useContext, useState, useEffect } from 'react'
import { storageAPI } from '../utils/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 로드 (새로고침 시 유지)
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          // 사용자 정보 검증 (실제로는 서버에서 토큰 검증)
          setUser(userData)
        }
      } catch (error) {
        // 프로덕션에서는 에러 로깅
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to load user:', error)
        }
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await storageAPI.loginUser(email, password)
      const userData = { email: response.data.email, name: response.data.name }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || '로그인에 실패했습니다.' 
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await storageAPI.createUser({ name, email, password })
      const userData = { email: response.data.email, name: response.data.name }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || '회원가입에 실패했습니다.' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    // 로그아웃 후 뒤로가기 방지를 위해 히스토리 교체
    window.history.replaceState(null, '', '/')
  }

  const resetPassword = async (email) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const foundUser = users.find((u) => u.email === email)

      if (foundUser) {
        const newPassword = Math.random().toString(36).slice(-8)
        foundUser.password = newPassword
        localStorage.setItem('users', JSON.stringify(users))
        
        return { 
          success: true, 
          message: `임시 비밀번호: ${newPassword} (실제로는 이메일로 전송됩니다)` 
        }
      } else {
        return { success: false, error: '등록되지 않은 이메일입니다.' }
      }
    } catch (error) {
      return { success: false, error: '비밀번호 재설정에 실패했습니다.' }
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
