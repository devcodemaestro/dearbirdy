// constants/buddyTestQuestions.ts
export type Answer = 0 | 1 | 2;
export type Direction = "life" | "lifestyle";

interface Option {
  value: Answer;
  emoji: string; // 이모지만 별도로 정의
  label: string; // 순수 텍스트
}

export interface Question {
  id: number;
  text: string;
  direction: Direction;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "취미나 여가보다 자기계발이 더 중요하다",
    direction: "life",
    options: [
      { value: 2, emoji: "✏️", label: "자기계발이요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "🎵", label: "취미나 여가죠!" },
    ],
  },
  {
    id: 2,
    text: "즐거운 방식보다 효율적인 방식을 선호한다",
    direction: "life",
    options: [
      { value: 2, emoji: "👓", label: "효율이 중요하죠" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "😄", label: "즐거워야해요!" },
    ],
  },
  // 추가 질문
  {
    id: 3,
    text: "목표를 이루기 위해서라면 힘들어도 참을 수 있다",
    direction: "life",
    options: [
      { value: 2, emoji: "📈", label: "네, 참을수 있어요" },
      { value: 1, emoji: "🤔", label: "그럭저럭 애매해요" },
      { value: 0, emoji: "🤔", label: "아니요, 힘든 건 싫어요!" },
    ],
  },
  {
    id: 4,
    text: "하고 싶은 일보다 돈이 더 중요하다",
    direction: "life",
    options: [
      { value: 2, emoji: "💸", label: "돈이 제일 중요해요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "💓", label: "하고 싶은 일을 하는게 중요해요!" },
    ],
  },
  {
    id: 5,
    text: "성공한 삶이 여유로운 삶보다 중요하다",
    direction: "life",
    options: [
      { value: 2, emoji: "💰", label: "성공한 삶을 사는 게 중요하죠" },
      { value: 1, emoji: "🟰", label: "보통인 것 같아요" },
      { value: 0, emoji: "🏖️", label: "여유 있는 삶이 더 나아요" },
    ],
  },
  {
    id: 6,
    text: "일과 삶의 균형에서 일이 우선이라고 생각한다",
    direction: "life",
    options: [
      { value: 2, emoji: "🖥️", label: "일이 우선이에요!" },
      { value: 1, emoji: "🟰", label: "비슷하다고 생각해요" },
      { value: 0, emoji: "🏖️", label: "제 삶이 우선이에요!" },
    ],
  },
  {
    id: 7,
    text: "여러 사람과 교류하는 것이 에너지를 준다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "네! 교류가 좋아요" },
      { value: 1, emoji: "🤔", label: "그때그때 다르거나 비슷해요" },
      { value: 0, emoji: "🫰", label: "아니요, 혼자가 더 편해요" },
    ],
  },
  {
    id: 8,
    text: "혼자만의 시간보다 함께하는 시간이 더 즐겁다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "함께 하는 시간이 더 좋아요" },
      { value: 1, emoji: "🟰", label: "비슷비슷한 것 같아요" },
      { value: 0, emoji: "🫰", label: "혼자만의 시간이 더 좋아요" },
    ],
  },
  {
    id: 9,
    text: "새로운 사람을 만나는 것이 설렌다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "😄", label: "네, 설레요!" },
      { value: 1, emoji: "🟰", label: "보통인 것 같아요" },
      { value: 0, emoji: "😅", label: "아니요, 새로운 만남은 어려워요" },
    ],
  },
  {
    id: 10,
    text: "개인 활동보다 단체 활동이 편하다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🙌", label: "단체활동이요" },
      { value: 1, emoji: "🟰", label: "둘이 비슷해요" },
      { value: 0, emoji: "🫰", label: "개인활동이요" },
    ],
  },
  {
    id: 11,
    text: "주말에 나는 주로 약속을 잡아 친구들과 만난다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "👟", label: "네, 주로 약속이 있어요!" },
      { value: 1, emoji: "🤔", label: "때에 따라 달라요" },
      { value: 0, emoji: "🏠", label: "아니요, 내 집이 최고" },
    ],
  },
  {
    id: 12,
    text: "모임에서 처음 보는 사람이 있다면 먼저 다가가 말을 건다",
    direction: "lifestyle",
    options: [
      { value: 2, emoji: "🗣️", label: "주로 말을 거는 타입이에요" },
      { value: 1, emoji: "🤔", label: "때에 따라 달라요" },
      { value: 0, emoji: "👀", label: "주로 가만히 있는 타입이에요" },
    ],
  },
];
