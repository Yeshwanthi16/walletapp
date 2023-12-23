import { useSelector } from "react-redux";
import { StyledContainer, StyledPageContainer } from "../Styles";
import { Transaction } from "../../additional/transaction";

export const Cashback = () => {
  const data = useSelector((state) => state.user);
  return (
    <StyledContainer>
      <h2>Cashback</h2>
      <StyledPageContainer>
        {data?.transactions[0]?.transaction.length < 1
          ? "No transactions"
          : data?.transactions[0]?.transaction &&
            data?.transactions[0]?.transaction
              .slice()
              .reverse()
              .map((item) => {
                return (
                  <>
                    {item.type === "Cashback" && (
                      <Transaction
                        id={item?.id}
                        type={item?.type}
                        amount={item?.amount?.toFixed(2)}
                        date={item?.date}
                        email={item?.email}
                      />
                    )}
                  </>
                );
              })}
      </StyledPageContainer>
    </StyledContainer>
  );
};
