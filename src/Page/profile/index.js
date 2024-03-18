import { useSelector } from "react-redux";

import {
  StyledContainer,
  StyledPageContainer,
  StyledProfileCard,
  StyledHeadingWrapper
} from "../Styles";

export const Profile = () => {
  const data = useSelector((state) => state.user);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <StyledContainer>
      <h1>Profile</h1>
      <StyledPageContainer>
        <StyledProfileCard>
        <StyledHeadingWrapper>
          <h3> {`Email ID :   ${data.user.email}`}</h3>
          <h3> {`Username :   ${data.user.username}`}</h3>
          <h3> {`Wallet balance :   ₹${data.user.walletBalance}`}</h3>
        </StyledHeadingWrapper>
        </StyledProfileCard>
      </StyledPageContainer>
    </StyledContainer>
  );
};
