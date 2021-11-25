import { useSelector } from "react-redux";
import { LogState } from "../store/logReducer";

export default function Map(props: any) {
  const loggedUser = useSelector<LogState>((state) => state.loggedUser);
  return (
    <>
      <h1>{loggedUser ? "user is " + loggedUser : " not"}</h1>
      MAP
    </>
  );
}
