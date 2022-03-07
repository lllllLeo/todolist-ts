import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { todoActions } from "../store/todo";
import Todo from "../models/Todo";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);

  const handleRemove = (id: string) => {
    dispatch(todoActions.removeTodo(id));
  };

  return (
    <Todos>
      {todos.length === 0 ? (
        <EmptyItem>no data.</EmptyItem>
      ) : (
        todos.map((todo: Todo) => (
          <Item key={todo.id}>
            <span>{todo.text} </span>
            <Button onClick={() => handleRemove(todo.id)}>X</Button>
          </Item>
        ))
      )}
    </Todos>
  );
};

const Todos = styled.ul`
  width: 50%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Item = styled.li`
  height: 20px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const EmptyItem = styled.p`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: 0px solid black;
  text-align: right;
  color: red;
  cursor: pointer;
  background: #dedede;
  &:hover {
    background: #c6c6c6;
  }
  &:active {
    background: #ffffff;
  }
`;
export default TodoList;
