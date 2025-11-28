import { useNetworkStatus } from '../../hooks/useNetworkStatus'
import Toast from './Toast'
import { useState, useEffect } from 'react'

const NetworkStatus = () => {
  const isOnline = useNetworkStatus()
  const [showToast, setShowToast] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    if (!isOnline && !wasOffline) {
      setShowToast(true)
      setWasOffline(true)
    } else if (isOnline && wasOffline) {
      setShowToast(true)
      setWasOffline(false)
    }
  }, [isOnline, wasOffline])

  if (isOnline) {
    return showToast ? (
      <Toast
        message="네트워크 연결이 복구되었습니다."
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    ) : null
  }

  return showToast ? (
    <Toast
      message="네트워크 연결을 확인해주세요."
      type="error"
      isVisible={showToast}
      onClose={() => setShowToast(false)}
      duration={0} // 오프라인 상태일 때는 자동으로 사라지지 않음
    />
  ) : null
}

export default NetworkStatus

