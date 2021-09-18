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
import { useSelector } from 'react-redux';
import ImageCarousel from './components/ImageCarousel';

export default function App() {

    const [searchState, setSearchState] = React.useState(false);
    const [detailState, setDetailState] = React.useState(false);
    const [slider, setSlider] = React.useState([100,2000]);
    const [sliderText, setSliderText] = React.useState("100 / 2000");

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
        setSliderText(newValue[0] + " / " + newValue[1]);
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
                            value={sliderText}
                            InputProps={{ readOnly: true }}
                        />
                    </Drawer>
                </React.Fragment>
            </div>
            <div className="detail">
                <React.Fragment key="bottom">
                    <Drawer anchor="right" open={detailState} onClose={toggleDetail(false)}>
                        <Box
                            className="close">
                            <Fab 
                                color="secondary" 
                                aria-label="edit"
                                onClick={toggleDetail(false)}>
                                <CloseIcon/>
                            </Fab>
                        </Box>
                        <Box className="detail-line">
                            <TextField 
                                id="outlined-basic" 
                                label="Name" 
                                variant="outlined" 
                                value={marker.name}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <Box className="detail-line">
                            <TextField 
                                id="outlined-basic" 
                                label="Latitude" 
                                variant="outlined" 
                                value={marker.lat}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <Box className="detail-line">
                            <TextField 
                                id="outlined-basic" 
                                label="Longitude" 
                                variant="outlined" 
                                value={marker.lng}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <Box className="detail-line">
                            <TextField 
                                id="outlined-basic" 
                                label="Altitude" 
                                variant="outlined" 
                                value={marker.altitude}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>
                        <ImageCarousel
                            marker={marker}>
                        </ImageCarousel>
                    </Drawer>
                </React.Fragment>
            </div>
            <Map
                markerClicked={() => {
                    setDetailState(true);
                }}
                altitudes={slider}>
            </Map>
        </div>
    );
}
