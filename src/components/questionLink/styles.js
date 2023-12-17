import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
export const StyledLeftContainer = styled.div``;
export const StyledRightContainer = styled.div`
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #3232cb;
    transition: 1s;
  }
`;
