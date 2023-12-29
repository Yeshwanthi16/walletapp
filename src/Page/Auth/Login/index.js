import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import { Question } from "../../../additional/question";
import { REACT_APP_API } from "../../../constants";

function Login() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!(email === "" || password === "")) {
      e.preventDefault();
      try {
        const response = await axios.post(`${REACT_APP_API}/login`, {
          email,
          password,
        });
        console.log("RESPONSE", response);
        localStorage.setItem("token", JSON.stringify(response.data));
        navigate("/dashboard");
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        setUser(true);
      } catch (error) {
        setUser(false);
      }
    }
  }

  return (
    <StyledPageContainer>
      <form onSubmit={handleSubmit}>
        <StyledBoxContainer>
          <h1>Log in</h1>
          <TextField
            id="filled-basic"
            label="Mail ID"
            variant="filled"
            sx={{ width: "500px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl variant="filled">
            <InputLabel htmlFor="component-filled">Password</InputLabel>
            <FilledInput
              id="component-filled"
              sx={{ width: "500px" }}
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
          <StyledButton type="submit">Submit</StyledButton>
          <Question
            question="Don't have an account?"
            linkName="Register"
            path={"/register"}
          />
          {!user && <Alert severity="error">Invalid credentials</Alert>}
        </StyledBoxContainer>
      </form>
    </StyledPageContainer>
  );
}
export default Login;
