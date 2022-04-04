import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import ToDo from "./components/ToDo";
import Block from "./models/Block";
import { RootState } from "./store";

function App() {
  const blocks = useSelector((state: RootState) => state.block);

  return (
    <Container>
      <Header />
      {blocks.map((item: Block) => (
        <ToDo key={item.id} blockId={item.id} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export default App;
