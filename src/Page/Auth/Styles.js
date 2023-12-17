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
  gap: 18px;
  padding: 50px 50px;
  border-radius: 25px;
  align-items: center;
  background: white;
  box-shadow: 5px 5px #888888;
`;

export const StyledButton = styled.button`
  text-decoration: none;
  background-color: hsl(111, 80%, 73%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
    0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
  width: 200px;
  padding: 12px;
  cursor: pointer;
  border: 0;
  border: none;

  &:hover {
    background-color: hsl(121, 88%, 84%);
  }
`;
