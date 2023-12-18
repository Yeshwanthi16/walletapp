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
  FilledInput,
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
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const checkPassword = (first, second) => first === second;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkPassword(password, password2)) {
      setNoMatch(true);
      return;
    }

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_API}/register`, {
        username,
        email,
        password,
      });

      if (response.data.status === "OK") {
        navigate("/login");
      } else {
        setUserExist(true);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <StyledPageContainer>
      <form onSubmit={handleSubmit}>
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

          <FormControl sx={{ width: "300px" }} variant="filled">
            <InputLabel htmlFor="component-filled">Password</InputLabel>
            <FilledInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              variant="filled"
              sx={{ width: "300px" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ width: "300px" }} variant="filled">
            <InputLabel htmlFor="password2-input">Verify Password</InputLabel>
            <FilledInput
              id="password2-input"
              type={showPassword ? "text" : "password"}
              label="Verify Password"
              variant="filled"
              sx={{ width: "300px" }}
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <StyledButton type="submit" id="submit-button">
            Register
          </StyledButton>

          <Question
            question="Already have an account?"
            linkName="Login"
            path={"/login"}
          />

          {userExist && (
            <Alert severity="error">Account with Email ID already exists</Alert>
          )}
          {noMatch && <Alert severity="error">Passwords don't match</Alert>}
        </StyledBoxContainer>
      </form>
    </StyledPageContainer>
  );
}

export default Register;
