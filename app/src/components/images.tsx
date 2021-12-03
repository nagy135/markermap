import { useDispatch, useSelector } from "react-redux";

import { TRootStore } from "../store";

type TImageProps = {
  open: boolean;
};

export default function Images(_props: TImageProps) {
  const dispatch = useDispatch();
  const selectedRecord = useSelector(
    (state: TRootStore) => state.map.selectedRecord
  );
  return <></>;
}
