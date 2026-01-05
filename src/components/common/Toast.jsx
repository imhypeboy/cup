import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const Toast = ({ toast, message, type, isVisible, onClose, duration = 3000 }) => {
  // toast 객체 또는 개별 props 지원 (하위 호환성)
  const toastMessage = toast?.message || message
  const toastType = toast?.type || type || 'info'
  const toastIsVisible = toast?.isVisible !== undefined ? toast.isVisible : (isVisible !== undefined ? isVisible : true)

  useEffect(() => {
    if (toastIsVisible && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [toastIsVisible, duration, onClose])

  const bgColorMap = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }
  const bgColor = bgColorMap[type] || bgColorMap.info

  const iconMap = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }
  const icon = iconMap[toastType] || iconMap.info

  if (!toastIsVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-20 right-4 z-50 max-w-md"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={`${bgColor} border rounded-lg p-4 shadow-lg flex items-start gap-3`}>
          <div className="flex-shrink-0" aria-hidden="true">{icon}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
              aria-label="알림 닫기"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Toast

