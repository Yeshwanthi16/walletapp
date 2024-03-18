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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [userExist, setUserExist] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkPassword = (first, second) => first === second;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkPassword(formData.password, formData.password2)) {
      setNoMatch(true);
      return;
    }

    try {
      const response = await axios.post(`${REACT_APP_API}/register`, formData);

      if (response.data.status === "OK") {
        navigate("/login");
      } else {
        setUserExist(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <StyledPageContainer>
      <form onSubmit={handleSubmit}>
        <StyledBoxContainer>
          <h1>Register</h1>

          <TextField
            id="filled-basic-username"
            name="username"
            label="Username"
            variant="filled"
            sx={{ width: "300px" }}
            value={formData.username}
            onChange={handleInputChange}
          />

          <TextField
            id="filled-basic-email"
            label="Email ID"
            name="email"
            type="email"
            variant="filled"
            sx={{ width: "300px" }}
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormControl sx={{ width: "300px" }} variant="filled">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <FilledInput
              id="password-input"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              label="Password"
              sx={{ width: "300px" }}
              onChange={handleInputChange}
              value={formData.password}
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
              name="password2"
              type={showPassword2 ? "text" : "password"}
              label="Verify Password"
              variant="filled"
              sx={{ width: "300px" }}
              onChange={handleInputChange}
              value={formData.password2}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
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
