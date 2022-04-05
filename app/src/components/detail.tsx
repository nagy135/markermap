import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { TRootStore } from "../store";
import { useState } from "react";
import { Box, Drawer, Stack, TextField } from "@mui/material";
import Images from "./images";

export default function Detail(_props: any) {
  // hooks {{{
  const dispatch = useDispatch();
  const selectedRecord = useSelector(
    (state: TRootStore) => state.map.selectedRecord
  );
  // }}}

  // states {{{
  const [imagesOpen, setImagesOpen] = useState(false);
  // }}}

  /**
   * redux defocus record
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
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

  return (
    <div style={{ position: "relative" }} key="right">
      <Drawer
        anchor="right"
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
                variant="standard"
                value={selectedRecord.lat}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Longitude"
                variant="standard"
                value={selectedRecord.lon}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Altitude"
                variant="standard"
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
