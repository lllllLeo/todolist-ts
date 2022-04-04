import TodoHeader from "./todo/TodoHeader";
import TodoList from "./todo/TodoList";
import styled from "styled-components";

const ToDo = (props: { blockId: string }) => {
  return (
    <ToDoContainer>
      <TodoHeader blockId={props.blockId} />
      <TodoList blockId={props.blockId} />
    </ToDoContainer>
  );
};

const ToDoContainer = styled.div`
  width: 250px;
  border: 1px solid #e1e1e1;
  border-radius: 15px;
  padding: 15px 3px 15px 3px;
  background: #eaeaea;
`;

export default ToDo;
