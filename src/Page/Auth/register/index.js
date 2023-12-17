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
import Logo from "../../../assets/logo.png";
import {
  StyledButton,
  StyledBoxContainer,
  StyledPageContainer,
} from "../Styles";
import { REACT_APP_API } from "../../../constants";
import { QuestionLink } from "../../../components/questionLink";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const checkPassword = (first, second) => first === second;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    // if (!checkPassword(password, password2)) {
    //   setNoMatch(true);
    //   return;
    // }
    //
    // if (
    //   username === "" ||
    //   email === "" ||
    //   password === "" ||
    //   password2 === ""
    // ) {
    //   return;
    // }

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledPageContainer>
      <form onSubmit={handleSubmit}>
        <StyledBoxContainer>
          <img src={Logo} height={100} alt="logo" />

          <h1>Register</h1>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            sx={{ width: "250px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            sx={{ width: "250px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl sx={{ m: 1, width: "250px" }} variant="outlined">
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
          <FormControl sx={{ m: 1, width: "250px" }} variant="outlined">
            <InputLabel htmlFor="password2-input">Verify Password</InputLabel>
            <OutlinedInput
              id="password2-input"
              type={showPassword ? "text" : "password"}
              label="Verify Password"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Verify Password"
              value={password2}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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

          <StyledButton
            type="submit"
            id="submit-button"
            role="button"
            aria-label="submit-button"
          >
            Register
          </StyledButton>
          <QuestionLink
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
