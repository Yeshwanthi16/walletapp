import { useSelector } from "react-redux";
import { StyledContainer, StyledPageContainer } from "../Styles";
// import { TransactionItem } from "../../components/transactionItem";

export const Statement = () => {
    const data = useSelector((state) => state.user);
    return (
      <StyledContainer>
        <h2>Transactions</h2>
        <StyledPageContainer>
          {data?.transactions[0]?.transaction?.length < 1
            ? "No transactions"
            : data?.transactions[0]?.transaction &&
              data?.transactions[0]?.transaction
                .slice()
                .reverse()
                .map((item) => {
                  return (
                    <>
                    {/* //   {(item.type === "Transfer" ||
                    //     item.type === "Recharge") && (
                    //     <TransactionItem
                    //       id={item?.id}
                    //       type={item?.type}
                    //       amount={item?.amount?.toFixed(2)}
                    //       date={item?.date}
                    //       email={item?.email}
                    //       key={item?.id}
                    //     />
                    //   )} */}
                    </>
                  );
                })}
        </StyledPageContainer>
      </StyledContainer>
    );
}