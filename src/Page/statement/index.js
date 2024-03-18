import { useSelector } from "react-redux";
import * as React from "react";
import MUIDataTable from "mui-datatables";

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

export const Statement = () => {
  const data1 = useSelector((state) => state.user);
  const transactions = data1?.transactions[0].transaction
    .slice()
    .reverse()
    .map((transaction) => ({
      _id: transaction.id,
      transactiontype: transaction.type,
      amount: transaction.amount,
      fromEmail: transaction.fromEmail,
      toEmail: transaction.toEmail,
      date: transaction.date,
    }));

  console.log(transactions);
  return (
    // return (
    // <StyledContainer>
    //   <h1>Transactions</h1>
    //   <StyledPageContainer>
    // {data?.transactions[0]?.transaction?.length < 1
    //   ? "No transactions"
    //   : data?.transactions[0]?.transaction &&
    //     data?.transactions[0]?.transaction
    //       .slice()
    //       .reverse()
    //       .map((item) => {
    //         return (
    //           <>
    //              {(item.type === "Transfer" ||
    //               item.type === "Recharge") && (
    //               <Transaction
    //                 id={item?.id}
    //                 type={item?.type}
    //                 amount={item?.amount?.toFixed(2)}
    //                 date={item?.date}
    //                 email={item?.email}
    //                 key={item?.id}
    //               />
    //             )}
    //           </>
    //             );
    //           })}
    //   </StyledPageContainer>
    // </StyledContainer>
    //   <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         {/* <TableCell>id</TableCell> */}
    //         <TableCell >id</TableCell>
    //         <TableCell >Transactiontype</TableCell>
    //         <TableCell >Date</TableCell>
    //         <TableCell >ToEmail</TableCell>
    //         <TableCell >FromEmail</TableCell>
    //         <TableCell >Amount</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data?.transactions[0]?.transaction.slice().reverse().map((row) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           {/* <TableCell component="th" scope="row">
    //             {row.name}
    //           </TableCell> */}
    //           <TableCell >{row.id}</TableCell>
    //           <TableCell >{row.type}</TableCell>
    //           <TableCell >{row.date}</TableCell>
    //           <TableCell >{row.toEmail}</TableCell>
    //           <TableCell >{row.fromEmail}</TableCell>
    //           <TableCell >{row.amount?.toFixed(2)}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

    <>
      {transactions.length > 0 ? (
        <MUIDataTable
          title={"Transactions"}
          data={transactions}
          columns={columns}
        />
      ) : (
        <span>No transactions</span>
      )}
    </>
  );
};
