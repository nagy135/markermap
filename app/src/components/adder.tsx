import { useSelector } from "react-redux";

import { TRootStore } from "../store";

export default function Detail(_props: any) {
  const userId = useSelector((state: TRootStore) => state.log.userId);

  return <h1>Add new record</h1>;
}
