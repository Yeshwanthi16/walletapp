import {
  DateLabel,
  StyledTransactionItemLeft,
  StyledTransactionItemRight,
  StyledTransactionItemWrapper,
} from "./style";
import { useState } from "react";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
};

export const TransactionItem = ({ type, amount, date, email, key }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <>
      {type === "Cashback" ? (
        <StyledTransactionItemWrapper
          key={key}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <StyledTransactionItemLeft>{type}</StyledTransactionItemLeft>
          <StyledTransactionItemRight>
            ₹{amount} for Recharge of ₹{(amount * 100).toFixed(2)}.
          </StyledTransactionItemRight>
          {isHovered && (
            <DateLabel className="date">{formatDate(date)}</DateLabel>
          )}
        </StyledTransactionItemWrapper>
      ) : (
        <StyledTransactionItemWrapper
          key={key}
          type={type === "Transfer"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <StyledTransactionItemLeft>{type}</StyledTransactionItemLeft>
          <StyledTransactionItemRight>
            {amount > 0 && type === "Transfer" && `₹${amount} from ${email}`}
            {amount < 0 && type === "Transfer" && `₹${amount} to ${email}`}
            {type === "Recharge" && `₹${amount}`}
          </StyledTransactionItemRight>
          {isHovered && (
            <DateLabel className="date">{formatDate(date)}</DateLabel>
          )}
        </StyledTransactionItemWrapper>
      )}
    </>
  );
};
