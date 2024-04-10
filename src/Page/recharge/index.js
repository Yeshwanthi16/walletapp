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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.user);

  const handleSubmit = () => {
    const token = localStorage.getItem("token").replace(/"/g, "");
    // if (data?.email == undefined) data.email = "test@test.com";
    // const payload = { email: data?.email, amount: amount };
    const updatedEmail = data?.email || "wallet@mail.com";
    const payload = { email: updatedEmail, amount: amount };
    axios
      .post(`${REACT_APP_API}/recharge`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSnackbarMessage(response.data.response);
        setSnackbarOpen(true);
        setAmount("");
        axios
          .post(`${REACT_APP_API}/data`, {
            token: token,
          })
          .then((response) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
            console.log("response.data", response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      })
      .catch((error) => {
        console.log(error.message);
        navigate("/login");
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <StyledContainer>
      <h1>Recharge</h1>
      {/* <div data-testid="current-balance"> */}
      <h2 title="balance-field">
        Current Balance : ₹{data?.user?.walletBalance?.toFixed(2)}
      </h2>
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
