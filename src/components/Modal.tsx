import { ReactElement } from "react";
import styled from "styled-components";

const ModalComponent = (props: {
  isOpened: boolean;
  children: React.ReactNode;
}) => {
  const { isOpened, children } = props;

  const onTouchEnd = () => {};

  return (
    <>
      {isOpened ? <Backdrop /> : null}
      {isOpened ? <Modal>{children}</Modal> : null}
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

export default ModalComponent;
