class Todo {
  id!: string;
  content!: string; // 내용
  name!: string; // 작성자
  startDate!: Date; // 시작일
  endDate!: Date; // 종료일
  estimatedTime!: string; // 예상 소요시간
  elapsedTime!: string; // 실 소요시간
  blockId!: string; // 블록 id
}

export default Todo;
