import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function Filter({
  open,
  close,
  handleRangeChange,
  altitudeRanges,
}) {
  const sliderToText = (sliderArr) => sliderArr[0] + " / " + sliderArr[1];
  return (
    <div className="drawer">
      <React.Fragment key="left">
        <Button onClick={close(true)}>
          <SearchIcon />
          Filter
        </Button>
        <Drawer open={open} onClose={close(false)}>
          <Box className="close">
            <Fab color="primary" aria-label="edit" onClick={close(false)}>
              <CloseIcon />
            </Fab>
          </Box>
          <Divider />
          <Box className="slider-wrapper">
            <Typography id="range-slider" gutterBottom>
              Altitude range
            </Typography>
            <Slider
              value={altitudeRanges}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={3000}
              getAriaValueText={() => {
                "haha";
              }}
            ></Slider>
          </Box>
          <TextField
            id="outlined-basic"
            label="Altitude range"
            variant="outlined"
            value={sliderToText(altitudeRanges)}
            InputProps={{ readOnly: true }}
          />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
