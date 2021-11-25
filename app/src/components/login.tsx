import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "context/log";

export default function Login(props: any) {
  const { user, login, logout } = useAuth();
  const router = useRouter();
  return (
    <Stack
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>User: {user ? "login" : "logout"}</h2>

      <TextField id="login" label="Login" />
      <TextField
        id="password"
        label="Password"
        type="password"
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
        onClick={() => {
          login();
          router.push("/map");
        }}
      >
        Log in
      </Button>
    </Stack>
  );
}
