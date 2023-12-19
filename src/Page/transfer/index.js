import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StyledButtonContainer,
  StyledContainer,
  StyledInputFieldContainer,
} from "../Styles";
import { REACT_APP_API } from "../../constants";


export const Transfer = () => {

    return (
     <StyledContainer>
      <h3>Transfer</h3>
      <div>
        <h3>
          Current Balance{"    :     ₹ "}
          {/* {data?.user?.walletBalance?.toFixed(2)} */}
        </h3>
      </div>
      </StyledContainer>
    );
}
