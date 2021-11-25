import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login(props: any) {
  return (
    <Stack
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="login" label="Login" />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button
        style={{ margin: 8, marginTop: 20 }}
        size="large"
        color="info"
        variant="contained"
      >
        Log in
      </Button>
    </Stack>
  );
}
