import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import * as React from "react";

const columns = [
  {
    name: "_id",
    label: "Id",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
  {
    name: "transactiontype",
    label: "Transactiontype",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
  {
    name: "date",
    label: "Date",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
  {
    name: "toEmail",
    label: "ToEmail",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
  {
    name: "fromEmail",
    label: "FromEmail",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
  {
    name: "amount",
    label: "Amount",
    options: {
      filterOptions: { fullWidth: true },
    },
  },
];

export const Cashback = () => {
  const data = useSelector((state) => state.user);
  const cashbacks =
    data?.transactions[0].transaction
      .slice()
      .reverse()
      .filter((filter) => filter.type === "Cashback")
      .map((transaction) => ({
        _id: transaction.id,
        transactiontype: transaction.type,
        amount: transaction.amount,
        fromEmail: transaction.fromEmail,
        toEmail: transaction.toEmail,
        date: transaction.date,
      })) || [];
  return (
    // <StyledContainer>
    //   <h1>Cashback</h1>
    //   <StyledPageContainer>
    //     {data?.transactions[0]?.transaction.length < 1
    //       ? "No transactions"
    //       : data?.transactions[0]?.transaction &&
    //         data?.transactions[0]?.transaction
    //           .slice()
    //           .reverse()
    //           .map((item) => {
    //             return (
    //               <>
    //                 {item.type === "Cashback" && (
    //                   <Transaction
    //                     id={item?.id}
    //                     type={item?.type}
    //                     amount={item?.amount?.toFixed(2)}
    //                     date={item?.date}
    //                     email={item?.email}
    //                   />
    //                 )}
    //               </>
    //             );
    //           })}
    //   </StyledPageContainer>
    // </StyledContainer>
    <>
      {cashbacks.length > 0 ? (
        <MUIDataTable title={"Cashbacks"} data={cashbacks} columns={columns} />
      ) : (
        <span>No Cashbacks</span>
      )}
    </>
  );
};
