import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { performLogIn } from "../utils/log";

export default function useMapLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const loginToken = localStorage.getItem("loginToken");
      if (loginToken) {
        const response = await performLogIn({
          loginToken,
        });
        dispatch({ type: "LOG_IN", payload: { userId: response.id } });
      }
    })();
  }, []);
}
