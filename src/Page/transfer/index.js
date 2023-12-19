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
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSubmit = () => {}
    const handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    };

    return (
      <StyledContainer>
        <h2>Transfer</h2>
          <h3>
            Current Balance{"    :     ₹ "}
            {/* {data?.user?.walletBalance?.toFixed(2)} */}
          </h3>
        <StyledInputFieldContainer>
          <TextField
            id="to"
            label="Receiver's email"
            variant="filled"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            sx={{ maxWidth: "300px" }}
          />
          <TextField
            id="amount"
            label="₹ Amount"
            variant="filled"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ maxWidth: "300px" }}
          />
          <StyledButtonContainer>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100px", padding: "10px 0" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </StyledButtonContainer>
        </StyledInputFieldContainer>
        {snackbarMessage === "Transfer successful" ? (
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
        )}
      </StyledContainer>
    );
}
