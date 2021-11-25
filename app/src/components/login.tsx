import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useSelector } from "react-redux";
import { LogState } from "../store/logReducer";

export default function Login(props: any) {
  const loggedUser = useSelector<LogState>((state) => state.loggedUser);
  return (
    <Container>
      <h1>{loggedUser ? "logged in" : " not"}</h1>
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
          style={{
            margin: 8,
            marginTop: 20,
          }}
          size="large"
          color="info"
          variant="contained"
          onClick={() => {}}
        >
          Log in
        </Button>
      </Stack>
    </Container>
  );
}
