import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../store";
import { todoActions } from "../store/todo";

const TodoForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const value = todoInputRef.current!.value;

    if (value.trim() === "") {
      return;
    }

    const todo = {
      id: "",
      text: value,
    };
    dispatch(todoActions.addTodo(todo));
    todoInputRef.current!.value = "";
    todoInputRef.current!.focus();
  };
  return (
    <form onSubmit={handleAdd}>
      <Input ref={todoInputRef} placeholder="입력하세요" />
      <Button type="submit">추가</Button>
    </form>
  );
};

const Input = styled.input`
  background: white;
`;

const Button = styled.button`
  border: 1px solid black;
  text-align: right;
  color: blue;
  background: #ffffff;
  &:active {
    background: #dedede;
  }
`;

export default TodoForm;
