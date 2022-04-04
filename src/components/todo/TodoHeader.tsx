import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import styled from "styled-components";
import Todo from "../../models/Todo";
import Block from "../../models/Block";
import { blockActions } from "../../store/block";

const TodoHeader = (props: { blockId: string }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);
  const block = useSelector((state: RootState) => state.block);

  const filteredBlock = todos.filter(
    (item: Todo) => item.blockId === props.blockId
  );
  const { id, name } = block.find((item: Block) => item.id === props.blockId);
  // const id = block.find((item: Block) => item.id === props.blockId).id;

  const handleRemoveBlock = (id: string) => {
    dispatch(blockActions.removeBlock(id));
  };
  return (
    <>
      <ToDoName>{name}</ToDoName>/
      <ToDoCount>{filteredBlock.length}개</ToDoCount>
      <RemoveBlockButton type="button" onClick={() => handleRemoveBlock(id)}>
        X
      </RemoveBlockButton>
    </>
  );
};

const ToDoName = styled.span`
  width: 100%;
  text-align: center;
`;
const ToDoCount = styled.span`
  width: 100%;
  text-align: right;
`;
const RemoveBlockButton = styled.button``;

export default TodoHeader;
