import styled from "styled-components";

export const StyledTransactionItemWrapper = styled.div(
  ({ type }) => `
    position: relative; 
    background: ${type ? "#fae1e1" : "#def8d3"};
    max-width: 700px;
    padding: 10px 30px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    transition: padding 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      padding: 12px 36px;
      & .date {
        opacity: 1; 
        padding: 10px 0 0 0;
      }
    }
  `
);

export const DateLabel = styled.span`
  position: absolute;
  top: -25px;
  right: 10px;
  font-size: 12px;
  font-weight: bold;
  opacity: 0;
`;

export const StyledTransactionItemLeft = styled.div``;
export const StyledTransactionItemRight = styled.div``;
