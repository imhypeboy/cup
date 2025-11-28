// API 통신 시뮬레이션 유틸리티
// 실제 프로덕션에서는 axios나 fetch를 사용하여 실제 API와 통신

const API_DELAY = 500 // 0.5초 지연 시뮬레이션
const API_TIMEOUT = 10000 // 10초 타임아웃

// 네트워크 상태 확인
const isOnline = () => navigator.onLine

// API 호출 시뮬레이션
export const apiCall = async (operation, data = null, shouldFail = false, failType = '500') => {
  return new Promise((resolve, reject) => {
    // 오프라인 체크
    if (!isOnline()) {
      setTimeout(() => {
        reject({
          status: 0,
          message: '네트워크 연결을 확인해주세요.',
          type: 'NETWORK_ERROR'
        })
      }, 100)
      return
    }

    // 타임아웃 설정
    const timeoutId = setTimeout(() => {
      reject({
        status: 408,
        message: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
        type: 'TIMEOUT'
      })
    }, API_TIMEOUT)

    // API 호출 시뮬레이션
    setTimeout(() => {
      clearTimeout(timeoutId)

      if (shouldFail) {
        // 에러 시뮬레이션
        switch (failType) {
          case '400':
            reject({
              status: 400,
              message: '잘못된 요청입니다.',
              type: 'BAD_REQUEST'
            })
            break
          case '401':
            reject({
              status: 401,
              message: '인증이 만료되었습니다. 다시 로그인해주세요.',
              type: 'UNAUTHORIZED'
            })
            break
          case '403':
            reject({
              status: 403,
              message: '접근 권한이 없습니다.',
              type: 'FORBIDDEN'
            })
            break
          case '404':
            reject({
              status: 404,
              message: '요청한 리소스를 찾을 수 없습니다.',
              type: 'NOT_FOUND'
            })
            break
          default:
            reject({
              status: 500,
              message: '서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
              type: 'SERVER_ERROR'
            })
        }
        return
      }

      // 성공 응답
      resolve({
        status: 200,
        data: data || { success: true },
        message: '성공'
      })
    }, API_DELAY)
  })
}

// 로컬 스토리지 기반 API 시뮬레이션
export const storageAPI = {
  // 사용자 관련
  async getUsers() {
    return apiCall('getUsers', JSON.parse(localStorage.getItem('users') || '[]'))
  },

  async createUser(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // 이메일 중복 체크
    if (users.some(u => u.email === userData.email)) {
      return Promise.reject({
        status: 400,
        message: '이미 사용 중인 이메일입니다.',
        type: 'DUPLICATE_EMAIL'
      })
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    return apiCall('createUser', newUser)
  },

  async loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return Promise.reject({
        status: 401,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        type: 'INVALID_CREDENTIALS'
      })
    }

    return apiCall('loginUser', { email: user.email, name: user.name })
  },

  // 블로그 포스트 관련
  async getPosts() {
    return apiCall('getPosts', JSON.parse(localStorage.getItem('blogPosts') || '[]'))
  },

  async createPost(postData) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    posts.unshift(newPost)
    localStorage.setItem('blogPosts', JSON.stringify(posts))
    
    return apiCall('createPost', newPost)
  },

  async deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]')
    const filteredPosts = posts.filter(p => p.id !== postId)
    localStorage.setItem('blogPosts', JSON.stringify(filteredPosts))
    
    return apiCall('deletePost', { success: true })
  }
}

