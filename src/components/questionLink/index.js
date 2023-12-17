import {
  StyledLeftContainer,
  StyledRightContainer,
  StyledWrapper,
} from "./styles";
import { Link } from "react-router-dom";

export const QuestionLink = ({ question, linkName, path }) => {
  return (
    <StyledWrapper>
      <StyledLeftContainer>{question}</StyledLeftContainer>
      <Link to={path}>
        <StyledRightContainer>{linkName}</StyledRightContainer>
      </Link>
    </StyledWrapper>
  );
};
