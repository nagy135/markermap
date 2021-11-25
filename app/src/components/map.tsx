import { useDispatch, useSelector } from "react-redux";
import { LogState } from "../store/logReducer";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Map(props: any) {
  const loggedUser = useSelector<LogState>((state) => state.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("loggedUser");
    if (login) {
      dispatch({ type: "LOG_IN", payload: { login, password: "" } });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };
  return (
    <>
      <h1>{loggedUser ? "user is " + loggedUser : " not"}</h1>
      MAP
      <Button
        style={{
          margin: 8,
          marginTop: 20,
        }}
        size="large"
        color="info"
        variant="contained"
        onClick={() => logOut()}
      >
        Log OUT
      </Button>
    </>
  );
}
