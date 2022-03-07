import { useSelector } from "react-redux";
import { RootState } from "../store";

const TodoHeader = () => {
  const todosLength = useSelector((state: RootState) => state.todo.length);
  return <h2>You have {todosLength} Todos.</h2>;
};

export default TodoHeader;
