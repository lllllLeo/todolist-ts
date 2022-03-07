import styled from "styled-components";

import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <Container>
      <TodoHeader />
      <TodoList />
      <TodoForm />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default App;
