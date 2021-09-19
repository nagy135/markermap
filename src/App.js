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
import './App.css';

import Map from './components/Map';
import Detail from './components/Detail';
import { useSelector } from 'react-redux';

export default function App() {

    const [searchState, setSearchState] = React.useState(false);
    const [detailState, setDetailState] = React.useState(false);

    const initialSlideValue = [100, 2000];
    const sliderToText = (sliderArr) => sliderArr[0] + " / " + sliderArr[1];
    const [slider, setSlider] = React.useState(initialSlideValue);

    const marker = useSelector((state) => state.marker.selected);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSearchState(open);
    };
    const toggleDetail = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDetailState(open);
    };

    const handleSliderChange = (_event, newValue) => {
        setSlider(newValue);
    };

    return (
        <div>
            <div className="drawer">
                <React.Fragment key="left">
                    <Button onClick={toggleDrawer(true)}><SearchIcon/>Filter</Button>
                    <Drawer open={searchState} onClose={toggleDrawer(false)}>
                        <Box
                            className="close">
                            <Fab 
                                color="secondary" 
                                aria-label="edit"
                                onClick={toggleDrawer(false)}>
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
                                value={slider}
                                onChange={handleSliderChange}
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
                            value={sliderToText(slider)}
                            InputProps={{ readOnly: true }}
                        />
                    </Drawer>
                </React.Fragment>
            </div>
            <Detail
                open={detailState}
                close={toggleDetail}
            >
            </Detail>
            <Map
                markerClicked={() => {
                    setDetailState(true);
                }}
                altitudes={slider}>
            </Map>
        </div>
    );
}
