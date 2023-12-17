import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  StyledButton,
  StyledBoxContainer,
  StyledPageContainer,
} from "../Styles";
import { REACT_APP_API } from "../../../constants";
import { Question } from "../../../additional/question";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
  return (
    <StyledPageContainer>
      <form>
        <StyledBoxContainer>
          <h1>Register</h1>

          <TextField
            id="filled-basic"
            label="Username"
            variant="filled"
            sx={{ width: "300px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Email ID"
            type="email"
            variant="filled"
            sx={{ width: "300px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StyledBoxContainer>
      </form>
    </StyledPageContainer>
  );
}

export default Register;
