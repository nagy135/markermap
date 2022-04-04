import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { TRootStore } from "../store";
import { useState } from "react";
import { Box, Drawer, Stack, TextField } from "@mui/material";
import Images from "./images";

export default function Detail(_props: any) {
  const dispatch = useDispatch();
  const [imagesOpen, setImagesOpen] = useState(false);
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
    setImagesOpen(false);
  };

  const anchor = "right";
  return (
    <div style={{ position: "relative" }} key={anchor}>
      <Drawer
        anchor={anchor}
        open={selectedRecord !== undefined}
        onClose={close()}
      >
        {selectedRecord ? (
          <Box style={{ margin: 10 }}>
            <Stack spacing={2}>
              <Button variant="outlined" color="error" onClick={close()}>
                close
              </Button>
              <TextField
                id="outlined-read-only-input"
                label="Name"
                value={selectedRecord.name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Latitude"
                value={selectedRecord.lat}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Longitude"
                value={selectedRecord.lon}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Altitude"
                value={selectedRecord.altitude}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                size="large"
                color="success"
                variant="contained"
                onClick={() => setImagesOpen(true)}
              >
                Images
              </Button>
            </Stack>
          </Box>
        ) : (
          <div>NONE</div>
        )}
      </Drawer>
      <Images open={imagesOpen} setOpen={setImagesOpen} />
    </div>
  );
}
