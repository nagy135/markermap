import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useSelector, useDispatch } from "react-redux";
import { LogState } from "../store/logReducer";
import { useEffect, useState, useCallback } from "react";

import { performLogIn } from "../utils/log";

import { useNavigate } from "react-router-dom";

export default function Login(props: any) {
  const loggedUser = useSelector<LogState>(
    (state) => state.loggedUser as string | null
  );

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useCallback(async () => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      const { login } = await performLogIn({
        loginToken,
      });
      dispatch({ type: "LOG_IN", payload: { login } });
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      navigate("/map");
    }
  }, [loggedUser]);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    const payload = {
      login: login,
    };
    const { loginToken } = await performLogIn(payload);
    console.log(
      "================\n",
      "loginToken: ",
      loginToken,
      "\n================"
    );
    localStorage.setItem("loginToken", loginToken);
    dispatch({ type: "LOG_IN", payload });
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>{loggedUser ? "user is " + loggedUser : " not"}</h1>
      <Stack
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          label="Login"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="current-password"
        />
        <Button
          style={{
            margin: 8,
            marginTop: 20,
          }}
          size="large"
          color="info"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Stack>
    </Box>
  );
}
