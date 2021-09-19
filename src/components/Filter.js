import React from "react";
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

export default function Filter({open, close, handleRangeChange, altitudeRanges}){
    const sliderToText = (sliderArr) => sliderArr[0] + " / " + sliderArr[1];
    return (
        <div className="drawer">
            <React.Fragment key="left">
                <Button onClick={close(true)}><SearchIcon/>Filter</Button>
                <Drawer open={open} onClose={close(false)}>
                    <Box
                        className="close">
                        <Fab
                            color="secondary"
                            aria-label="edit"
                            onClick={close(false)}>
                            <CloseIcon/>
                        </Fab>
                    </Box>
                    <Divider />
                    <Box
                        className="slider-wrapper">
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
                            getAriaValueText={()=>{"haha"}}>
                        </Slider>
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
};
