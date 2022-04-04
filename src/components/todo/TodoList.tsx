import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Todo from "../../models/Todo";
import { AppDispatch, RootState } from "../../store";
import { todoActions } from "../../store/todo";
import Modal from "../Modal";
import TodoForm from "./TodoForm";

const TodoList = (props: { blockId: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);
  const filteredTodos = todos.filter(
    (item: Todo) => item.blockId === props.blockId
  );
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleRemove = (id: string) => {
    dispatch(todoActions.removeTodo(id));
  };

  const handlerClick = (id: string) => {
    const todo = todos.find((item: Todo) => item.id === id);
    // console.log("todo: ", todo);
  };

  const handleModal: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    setIsOpened(true);
  };

  const handleCloseModal = () => {
    setIsOpened(false);
  };

  const reorder = (list: Array<Todo>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // source는 현재 위치한 droppable의 위치와 인덱스, destination은 dnd를 마친 후의 droppable의 위치와 인덱스
  // destination이 끝 위치, source가 시작 위치를 의미함
  const handleDragStart = (result: DropResult) => {
    setIsDragging(true);
    // console.log("handleDragStart");
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    // console.log("handleDragEnd");
    // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
    if (!result.destination) {
      return;
    }
    // console.log(result.source.index, result.destination.index);
    // console.log(result.draggableId);
    const items = reorder(
      filteredTodos,
      result.source.index,
      result.destination.index
    );
    // console.log("todos: ", todos);
    // console.log("items: ", items[0].blockId);
    // console.log({ ...items, ...todos });
    // console.log(items, todos);
    // console.log(filteredTodos);
    // console.log(items);

    dispatch(todoActions.setTodo(items));
    // dispatch(blockActions.setTodo(items));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Droppable droppableId="todos">
        {(provided) => (
          <Todos
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Modal isOpened={isOpened}>
              <TodoForm
                blockId={props.blockId}
                onCloseModal={handleCloseModal}
              />
            </Modal>
            {filteredTodos.length === 0 ? (
              <EmptyItem>no data.</EmptyItem>
            ) : (
              filteredTodos.map((todo: Todo, index: number) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <Item
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      key={todo.id}
                      onClick={() => handlerClick(todo.id)}
                    >
                      <Content>{todo.content}</Content>
                      <Name>{todo.name}</Name>
                      <RemoveButton onClick={() => handleRemove(todo.id)}>
                        X
                      </RemoveButton>
                    </Item>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
            <AddButton onClick={handleModal}>+ 추가하기</AddButton>
          </Todos>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Todos = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  text-align: left;
  margin: 0;
`;

const Content = styled.span`
  width: 80%;
`;
const Name = styled.span`
  width: 20%;
  color: #bbbbbb;
  font-size: 10px;
`;
const Item = styled.li`
  width: 100%
  height: 20px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  margin: 0.5px;
  cursor: pointer;
  &:hover {
    background: #d6d6d6;
  }
  &:active {
    background: #bbbbbb;
  }
`;

const EmptyItem = styled.p`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button`
  border: 0px solid black;
  text-align: center;
  color: #aaaaaa;
  cursor: pointer;
  &:hover {
    background: #d6d6d6;
  }
  &:active {
    background: #bbbbbb;
  }
`;

const RemoveButton = styled.button`
  border: 0px solid black;
  text-align: right;
  color: red;
  cursor: pointer;
  background: #dedede;
  &:hover {
    background: #d6d6d6;
  }
  &:active {
    background: #bbbbbb;
  }
`;
export default TodoList;
