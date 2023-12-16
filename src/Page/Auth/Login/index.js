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
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  StyledButton,
  StyledBoxContainer,
  StyledPageContainer,
} from "../Styles";
// import { QuestionLink } from "../../../components/questionLink";
// import { REACT_APP_API } from "../../../constants";

function Login() {

  const [email, setEmail] = useState("");

  return (
    <StyledPageContainer>
      <form>
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
            <FilledInput id="component-filled" sx={{ width: "500px" }} />
          </FormControl>
        </StyledBoxContainer>
      </form>
    </StyledPageContainer>
  ); 
};
export default Login;