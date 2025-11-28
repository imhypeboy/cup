// 프로덕션 환경에서 console.log 제거
const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args)
    }
    // 프로덕션에서는 에러 로깅 서비스로 전송
    // 예: Sentry, LogRocket 등
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
}

// 민감한 정보는 절대 로그에 남기지 않음
export const safeLog = (data) => {
  if (isDevelopment) {
    const sanitized = { ...data }
    // 비밀번호, 토큰 등 민감한 정보 제거
    delete sanitized.password
    delete sanitized.token
    delete sanitized.accessToken
    delete sanitized.refreshToken
    console.log(sanitized)
  }
}

