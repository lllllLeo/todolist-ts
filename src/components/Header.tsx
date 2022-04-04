import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../store";
import { blockActions } from "../store/block";

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpened, setIsOpened] = useState<Boolean>(false);
  const blockNameInputRef = useRef<HTMLInputElement>(null);

  const handleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const handleAddBlock = (e: FormEvent) => {
    e.preventDefault();
    const blockName = blockNameInputRef.current!.value;
    if (blockName.trim().length === 0) {
      return;
    }

    const block = {
      id: "",
      name: blockName,
      createdDate: new Date().toString(),
    };

    dispatch(blockActions.addBlock(block));
    setIsOpened(false);
  };

  return (
    <>
      {isOpened ? (
        <Form onSubmit={handleAddBlock}>
          <BlockNameInput
            ref={blockNameInputRef}
            placeholder="block 이름 입력"
          />
          <AddNewBlockButton type="submit">추가</AddNewBlockButton>
          <CancelButton type="button" onClick={handleIsOpened}>
            취소
          </CancelButton>
        </Form>
      ) : (
        <AddNewListButton type="button" onClick={handleIsOpened}>
          새 블록 추가
        </AddNewListButton>
      )}
    </>
  );
};
const Form = styled.form``;
const AddNewListButton = styled.button``;
const AddNewBlockButton = styled.button``;
const CancelButton = styled.button``;
const BlockNameInput = styled.input``;
export default Header;
