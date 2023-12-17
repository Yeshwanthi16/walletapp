import styled from "styled-components";

export const StyledPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  background: #f0ffff;
`;

export const StyledBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px 50px;
  align-items: center;
  background: white;
  box-shadow: 10px 10px #888888;
`;

export const StyledButton = styled.button`
  background-color: #7fffd4;
  width: 120px;
  padding: 10px;
  cursor: pointer;
  border: 10;
  &:hover {
    background-color: #00ffaa;
  }
`;
