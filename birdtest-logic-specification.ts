// 타입 정의
type Answer = 0 | 1 | 2;  // 0: 아니다, 1: 보통이다, 2: 그렇다
type Direction = 'life' | 'lifestyle';  // life: 삶의 지향성, lifestyle: 생활 지향성

interface Question {
  id: number;
  text: string;
  direction: Direction;
}

interface BirdType {
  name: string;
  lifeScore: {
    min: number;
    max: number;
  };
  lifestyleScore: {
    min: number;
    max: number;
  };
  traits: string[];
}

// 질문 목록
const questions: Question[] = [
  // 삶의 지향성 질문
  { id: 1, text: "취미나 여가보다 자기계발이 더 중요하다", direction: "life" },
  { id: 2, text: "즐거운 방식보다 효율적인 방식을 선호한다", direction: "life" },
  { id: 3, text: "목표를 이루기 위해서라면 힘들어도 참을 수 있다", direction: "life" },
  { id: 4, text: "하고 싶은 일보다 돈이 더 중요하다", direction: "life" },
  { id: 5, text: "성공한 삶이 여유로운 삶보다 중요하다", direction: "life" },
  { id: 6, text: "일과 삶의 균형에서 일이 우선이라고 생각한다", direction: "life" },
  
  // 생활 지향성 질문
  { id: 7, text: "여러 사람과 교류하는 것이 에너지를 준다", direction: "lifestyle" },
  { id: 8, text: "혼자만의 시간보다 함께하는 시간이 더 즐겁다", direction: "lifestyle" },
  { id: 9, text: "새로운 사람을 만나는 것이 설렌다", direction: "lifestyle" },
  { id: 10, text: "개인 활동보다 단체 활동이 편하다", direction: "lifestyle" },
  { id: 11, text: "주말에 나는 주로 약속을 잡아 친구들과 만난다", direction: "lifestyle" },
  { id: 12, text: "모임에서 처음 보는 사람이 있다면 먼저 다가가 말을 건다", direction: "lifestyle" },
];

// 새 유형 정의
const birdTypes: BirdType[] = [
  {
    name: "앵무새",
    lifeScore: { min: 10, max: 12 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["소통능력", "문제해결"]
  },
  {
    name: "부엉이",
    lifeScore: { min: 10, max: 12 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["지혜", "분석력"]
  },
  {
    name: "뱁새",
    lifeScore: { min: 7, max: 9 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["신중함", "분석력"]
  },
  {
    name: "카나리아",
    lifeScore: { min: 4, max: 6 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["음악성", "조화"]
  },
  {
    name: "벌새",
    lifeScore: { min: 0, max: 3 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["활력", "예술성"]
  },
  {
    name: "파랑새",
    lifeScore: { min: 0, max: 3 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["순수함", "사색"]
  }
];

// 점수 계산 함수
function calculateScore(answers: Answer[], direction: Direction): number {
  return answers
    .filter((_, index) => questions[index].direction === direction)
    .reduce((sum, answer) => sum + answer, 0);
}

// 새 유형 매칭 함수
function matchBirdType(lifeScore: number, lifestyleScore: number): BirdType {
  return birdTypes.find(
    bird =>
      lifeScore >= bird.lifeScore.min &&
      lifeScore <= bird.lifeScore.max &&
      lifestyleScore >= bird.lifestyleScore.min &&
      lifestyleScore <= bird.lifestyleScore.max
  )!;
}

// 사용 예시
function processTestResults(answers: Answer[]) {
  const lifeScore = calculateScore(answers, "life");
  const lifestyleScore = calculateScore(answers, "lifestyle");
  const matchedBird = matchBirdType(lifeScore, lifestyleScore);
  
  return {
    scores: {
      life: lifeScore,
      lifestyle: lifestyleScore
    },
    result: matchedBird
  };
}
