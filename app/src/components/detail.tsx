import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { TRootStore } from "../store";
import React from "react";
import { Drawer } from "@mui/material";

export default function Detail(props: any) {
  const dispatch = useDispatch();
  const selectedRecord = useSelector(
    (state: TRootStore) => state.map.selectedRecord
  );

  const close = () => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch({
      type: "DESELECT",
    });
  };

  const anchor = "right";
  return (
    <React.Fragment key={anchor}>
      <Drawer
        anchor={anchor}
        open={selectedRecord !== undefined}
        onClose={close()}
      >
        <Button onClick={close()}>close</Button>
        {selectedRecord ? <div>{selectedRecord.id}</div> : <div>NONE</div>}
      </Drawer>
    </React.Fragment>
  );
}
