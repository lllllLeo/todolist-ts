import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../store";
import { todoActions } from "../../store/todo";
import PeriodDate from "./PeriodDate";
/* 
  id!: string;
  content!: string; // 내용
  name!: string; // 작성자
  startDate!: string; // 시작일
  endDate!: string; // 종료일
  estimatedTime!: string; // 예상 소요시간
  elapsedTime!: string; // 실 소요시간
*/
const TodoForm = (props: { onCloseModal: () => void; blockId: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    nameInputRef.current!.focus();
  }, []);

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    const name = nameInputRef.current!.value;
    const content = todoInputRef.current!.value;

    if (name.trim().length === 0 || content.trim().length === 0) {
      return;
    }

    const todo = {
      id: "",
      content: content,
      name: name,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      estimatedTime: "",
      elapsedTime: "",
      blockId: props.blockId,
    };
    dispatch(todoActions.addTodo(todo));
    handleCloseModal();
    todoInputRef.current!.value = "";
    todoInputRef.current!.focus();
  };

  const handleStartDateChange = (startDate: Date) => {
    setStartDate(startDate);
    // console.log(startDate.toLocaleDateString().replace(/\./g, ""));
  };
  const handleEndDateChange = (endDate: Date) => {
    setEndDate(endDate);
    // console.log(endDate.toLocaleDateString().replace(/\./g, ""));
  };

  const handleCloseModal = () => {
    props.onCloseModal();
  };

  return (
    <Form onSubmit={handleAddTodo}>
      <Button type="button" onClick={handleCloseModal}>
        X
      </Button>
      <div>
        작성자입력 : <NameInput ref={nameInputRef} placeholder="작성자 입력" />
      </div>
      <div>
        투두입력 : <TodoInput ref={todoInputRef} placeholder="To-Do" />
      </div>
      <div>
        실 소요시간 : <ElapsedTimeInput placeholder="실 소요시간" />
      </div>
      <div>
        예상 소요시간 : <EstimatedTimeInput placeholder="예상 소요시간" />
      </div>
      <PeriodDate
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <Button type="submit">추가</Button>
    </Form>
  );
};

const Form = styled.form`
  // display: flex;
  // position: fixed;
  // height: 40px;
  // width: 100%;
  // left: 0px;
  // bottom: 0px;
  // margin: 10px;
  display: flex;
  flex-direction: column;
`;

const NameInput = styled.input`
  // width: 20%;
  // background: white;
`;

const TodoInput = styled.input`
  // width: 70%;
  // background: white;
`;

const ElapsedTimeInput = styled.input``;
const EstimatedTimeInput = styled.input``;

const Button = styled.button`
  width: 10%;
  border: 1px solid black;
  color: blue;
  cursor: pointer;
  background: #ffffff;
  &:active {
    background: #dedede;
  }
`;

export default TodoForm;
