// 퀴즈 데이터 구조
export const examTypes = {
  정보처리기사: '정보처리기사',
  컴퓨터활용능력1급: '컴퓨터활용능력1급',
  SQLD: 'SQLD'
}

// 퀴즈 문제 데이터
export const quizData = {
  정보처리기사: [
    {
      id: 1,
      category: '데이터베이스',
      question: '다음 중 데이터베이스 정규화의 목적이 아닌 것은?',
      options: [
        '데이터 중복을 제거한다',
        '데이터 무결성을 보장한다',
        '저장 공간을 최소화한다',
        '데이터 접근 속도를 향상시킨다'
      ],
      correctAnswer: 3,
      explanation: '정규화는 데이터 중복 제거와 무결성 보장이 목적이며, 오히려 조인 연산이 증가하여 접근 속도가 느려질 수 있습니다.'
    },
    {
      id: 2,
      category: '알고리즘',
      question: '퀵 정렬(Quick Sort)의 평균 시간 복잡도는?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n²)',
        'O(log n)'
      ],
      correctAnswer: 1,
      explanation: '퀵 정렬의 평균 시간 복잡도는 O(n log n)이며, 최악의 경우 O(n²)입니다.'
    },
    {
      id: 3,
      category: '네트워크',
      question: 'TCP/IP 프로토콜 스택에서 전송 계층(Transport Layer)에 해당하는 프로토콜은?',
      options: [
        'IP',
        'TCP, UDP',
        'HTTP',
        'Ethernet'
      ],
      correctAnswer: 1,
      explanation: 'TCP와 UDP는 전송 계층 프로토콜이며, IP는 네트워크 계층, HTTP는 응용 계층, Ethernet은 데이터 링크 계층입니다.'
    },
    {
      id: 4,
      category: '운영체제',
      question: '다음 중 프로세스 스케줄링 알고리즘이 아닌 것은?',
      options: [
        'FCFS (First Come First Served)',
        'SJF (Shortest Job First)',
        'Round Robin',
        'FIFO (First In First Out)'
      ],
      correctAnswer: 3,
      explanation: 'FIFO는 큐 자료구조의 특성이며, 프로세스 스케줄링 알고리즘은 FCFS, SJF, Round Robin 등이 있습니다.'
    },
    {
      id: 5,
      category: '소프트웨어 공학',
      question: '다음 중 객체지향 프로그래밍의 특징이 아닌 것은?',
      options: [
        '캡슐화',
        '상속',
        '다형성',
        '순차성'
      ],
      correctAnswer: 3,
      explanation: '객체지향 프로그래밍의 주요 특징은 캡슐화, 상속, 다형성, 추상화이며, 순차성은 구조적 프로그래밍의 특징입니다.'
    }
  ],
  컴퓨터활용능력1급: [
    {
      id: 1,
      category: '엑셀',
      question: '엑셀에서 VLOOKUP 함수의 네 번째 인수 [range_lookup]에서 TRUE를 사용하면?',
      options: [
        '정확히 일치하는 값만 찾는다',
        '근사치 일치를 사용한다',
        '오름차순 정렬이 필요없다',
        '대소문자를 구분한다'
      ],
      correctAnswer: 1,
      explanation: 'TRUE는 근사치 일치를 의미하며, 참조 테이블이 오름차순으로 정렬되어 있어야 합니다.'
    },
    {
      id: 2,
      category: '액세스',
      question: '액세스에서 쿼리의 종류가 아닌 것은?',
      options: [
        '선택 쿼리',
        '작업 쿼리',
        '크로스탭 쿼리',
        '삽입 쿼리'
      ],
      correctAnswer: 3,
      explanation: '액세스 쿼리 종류는 선택, 작업(추가/업데이트/삭제), 크로스탭, 매개변수 쿼리 등이 있으며, 삽입 쿼리는 SQL 용어입니다.'
    },
    {
      id: 3,
      category: '엑셀',
      question: '엑셀에서 배열 수식의 입력 방법은?',
      options: [
        'Enter 키',
        'Ctrl + Enter',
        'Ctrl + Shift + Enter',
        'Alt + Enter'
      ],
      correctAnswer: 2,
      explanation: '배열 수식은 Ctrl + Shift + Enter로 입력하며, 수식 양쪽에 중괄호 {}가 자동으로 추가됩니다.'
    }
  ],
  SQLD: [
    {
      id: 1,
      category: 'SQL 기본',
      question: '다음 중 SQL에서 NULL 값에 대한 설명으로 옳은 것은?',
      options: [
        'NULL은 0과 같다',
        'NULL은 공백 문자열과 같다',
        'NULL은 알 수 없는 값이다',
        'NULL은 빈 값이다'
      ],
      correctAnswer: 2,
      explanation: 'NULL은 알 수 없는 값(Unknown)을 의미하며, 0이나 공백 문자열과는 다릅니다.'
    },
    {
      id: 2,
      category: 'SQL 활용',
      question: '다음 중 서브쿼리의 종류가 아닌 것은?',
      options: [
        '단일 행 서브쿼리',
        '다중 행 서브쿼리',
        '다중 컬럼 서브쿼리',
        '다중 테이블 서브쿼리'
      ],
      correctAnswer: 3,
      explanation: '서브쿼리는 단일 행, 다중 행, 다중 컬럼 서브쿼리로 분류되며, 다중 테이블 서브쿼리는 존재하지 않습니다.'
    },
    {
      id: 3,
      category: 'SQL 최적화',
      question: '인덱스를 사용하면 좋지 않은 경우는?',
      options: [
        'WHERE 절에서 자주 사용되는 컬럼',
        'JOIN 조건에 사용되는 컬럼',
        '자주 UPDATE되는 컬럼',
        'ORDER BY에 사용되는 컬럼'
      ],
      correctAnswer: 2,
      explanation: '자주 UPDATE되는 컬럼에 인덱스를 생성하면 인덱스도 함께 갱신되어 오히려 성능이 저하될 수 있습니다.'
    }
  ]
}

// 시험별 통계 데이터
export const getExamStats = (examType) => {
  const questions = quizData[examType] || []
  return {
    totalQuestions: questions.length,
    categories: [...new Set(questions.map(q => q.category))],
    totalCategories: [...new Set(questions.map(q => q.category))].length
  }
}

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  progress: 'quiz_progress',
  scores: 'quiz_scores',
  settings: 'quiz_settings'
}

// 진행 상황 저장
export const saveProgress = (examType, questionId, selectedAnswer, isCorrect) => {
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || '{}')
  if (!progress[examType]) {
    progress[examType] = {}
  }
  progress[examType][questionId] = {
    selectedAnswer,
    isCorrect,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress))
}

// 점수 저장
export const saveScore = (examType, score, totalQuestions) => {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.scores) || '[]')
  scores.push({
    examType,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    timestamp: new Date().toISOString()
  })
  localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores))
}

// 진행 상황 불러오기
export const getProgress = (examType) => {
  const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || '{}')
  return progress[examType] || {}
}

// 통계 가져오기
export const getStatistics = (examType) => {
  const progress = getProgress(examType)
  const questions = quizData[examType] || []
  const answered = Object.keys(progress).length
  const correct = Object.values(progress).filter(p => p.isCorrect).length
  
  return {
    total: questions.length,
    answered,
    correct,
    incorrect: answered - correct,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0
  }
}

