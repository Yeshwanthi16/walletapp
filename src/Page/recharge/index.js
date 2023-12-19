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


 export const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
   const handleSubmit = () => {}
   const handleSnackbarClose = (event, reason) => {};
  return (
    <StyledContainer>
      <h2>Recharge</h2>
      {/* <div data-testid="current-balance"> */}
        <h3 title="balance-field">Current Balance : ₹</h3>
      {/* </div> */}
      <StyledInputFieldContainer>
        <TextField
          id="filled-basic"
          label="₹ Amount"
          variant="filled"
          sx={{ maxWidth: "300px" }}
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <StyledButtonContainer>
          <Button
            title="submit-button"
            variant="contained"
            color="success"
            size="small"
            sx={{ width: "100px", padding: "10px 0" }}
            // label="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </StyledButtonContainer>
      </StyledInputFieldContainer>
      {snackbarMessage === "Wallet recharged successfully with cashback" ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      ) : (
        snackbarMessage && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        )
      )}
    </StyledContainer>
  );
};
