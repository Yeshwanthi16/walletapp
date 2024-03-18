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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.user);

  const handleSubmit = () => {
    const token = localStorage.getItem("token").replace(/"/g, "");

    if (!to || !amount) {
      setSnackbarMessage("Please enter a valid recipient email and amount");
      setSnackbarOpen(true);
      return;
    }
    if (to === data?.email) {
      setSnackbarMessage("Can't transfer to self");
      setSnackbarOpen(true);
      return;
    }
    const payload = { fromEmail: data.email, toEmail: to, amount: amount };
    axios
      .post(`${REACT_APP_API}/transfer`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSnackbarMessage(response.data.response);
        setSnackbarOpen(true);
        axios
          .post(`${REACT_APP_API}/data`, {
            token: token,
          })
          .then((response) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
            setTo("");
            setAmount("");
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      })
      .catch((error) => {
        console.log(error);
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
      <h1>Transfer</h1>
      <h2>
        <span>Current Balance</span>
        {"    :     ₹ "}
        {data?.user?.walletBalance?.toFixed(2)}
      </h2>
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
};
