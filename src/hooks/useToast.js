import { useState, useCallback, useRef, useEffect } from 'react'

export const useToast = () => {
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' })
  const timeoutRef = useRef(null)

  const showToast = useCallback((message, type = 'info') => {
    // 기존 타이머 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setToast({ isVisible: true, message, type })
  }, [])

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToast(prev => ({ ...prev, isVisible: false }))
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { toast, showToast, hideToast }
}

