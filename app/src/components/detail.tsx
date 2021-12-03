import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { TRootStore } from "../store";
import React from "react";
import { Box, Drawer, Stack, TextField } from "@mui/material";
import { API_ENDPOINT } from "../utils/constants";
import Images from "./images";

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
        {selectedRecord ? (
          <Box style={{ margin: 10 }}>
            <Stack spacing={2}>
              <TextField
                id="outlined-read-only-input"
                label="Name"
                defaultValue=""
                value={selectedRecord.name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Latitude"
                defaultValue=""
                value={selectedRecord.lat}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Longitude"
                defaultValue=""
                value={selectedRecord.lon}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Altitude"
                defaultValue=""
                value={selectedRecord.altitude}
                InputProps={{
                  readOnly: true,
                }}
              />
              <div>
                {selectedRecord.images.map((image) => (
                  <a href={`${API_ENDPOINT}/${image.path}`}>{image.name}</a>
                ))}
              </div>
            </Stack>
          </Box>
        ) : (
          <div>NONE</div>
        )}
      </Drawer>
      <Images open={true} />
    </React.Fragment>
  );
}
