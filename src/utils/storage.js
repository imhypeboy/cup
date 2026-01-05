/**
 * localStorage 유틸리티 함수
 * 에러 처리 및 QuotaExceededError 처리 포함
 */

const STORAGE_ERRORS = {
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  DISABLED: 'DISABLED',
  PARSE_ERROR: 'PARSE_ERROR',
  UNKNOWN: 'UNKNOWN'
}

/**
 * localStorage 사용 가능 여부 확인
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

/**
 * localStorage에 안전하게 저장
 */
export const safeSetItem = (key, value) => {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available')
    return { success: false, error: STORAGE_ERRORS.DISABLED }
  }

  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, stringValue)
    return { success: true }
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      // 스토리지가 가득 찬 경우, 오래된 데이터 삭제 시도
      try {
        clearOldData()
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
        return { success: true, warning: 'Old data cleared' }
      } catch (retryError) {
        return { success: false, error: STORAGE_ERRORS.QUOTA_EXCEEDED }
      }
    }
    return { success: false, error: STORAGE_ERRORS.UNKNOWN, message: e.message }
  }
}

/**
 * localStorage에서 안전하게 읽기
 */
export const safeGetItem = (key, defaultValue = null) => {
  if (!isStorageAvailable()) {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    
    // JSON 파싱 시도
    try {
      return JSON.parse(item)
    } catch (parseError) {
      // JSON이 아닌 경우 문자열로 반환
      return item
    }
  } catch (e) {
    console.error(`Error reading localStorage key "${key}":`, e)
    return defaultValue
  }
}

/**
 * localStorage에서 안전하게 삭제
 */
export const safeRemoveItem = (key) => {
  if (!isStorageAvailable()) {
    return { success: false, error: STORAGE_ERRORS.DISABLED }
  }

  try {
    localStorage.removeItem(key)
    return { success: true }
  } catch (e) {
    return { success: false, error: STORAGE_ERRORS.UNKNOWN, message: e.message }
  }
}

/**
 * 오래된 데이터 정리 (QuotaExceededError 발생 시)
 */
const clearOldData = () => {
  const keysToKeep = ['user', 'quiz_progress', 'quiz_scores']
  const allKeys = Object.keys(localStorage)
  
  // 유지할 키가 아닌 오래된 데이터 삭제
  allKeys.forEach(key => {
    if (!keysToKeep.includes(key) && key.startsWith('blog')) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * 스토리지 사용량 확인 (대략적)
 */
export const getStorageUsage = () => {
  if (!isStorageAvailable()) {
    return { used: 0, available: 0, percentage: 0 }
  }

  let used = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length + key.length
    }
  }

  // 대략적인 제한 (브라우저마다 다름, 보통 5-10MB)
  const limit = 5 * 1024 * 1024 // 5MB
  return {
    used,
    available: limit - used,
    percentage: (used / limit) * 100
  }
}

export { STORAGE_ERRORS }
