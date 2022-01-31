import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { performLogIn } from "../utils/log";

import { useNavigate } from "react-router-dom";
import { TRootStore } from "../store";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state: TRootStore) => state.log.userId);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      navigate("/map");
    }
  }, [userId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      login,
      password,
    };
    try {
      const response = await performLogIn(payload);
      localStorage.setItem("loginToken", response.loginToken);
      dispatch({ type: "LOG_IN", payload: { userId: response.id } });
    } catch (error) {
      alert("invalid login");
    }
  };

  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1>Welcome to MarkerMap</h1>
      </Box>
      <Box
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </>
  );
}
