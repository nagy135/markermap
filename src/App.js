import React from 'react';
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

export default function App() {
    const [state, setState] = React.useState(false);
    const [slider, setSlider] = React.useState([100,2000]);
    const [sliderText, setSliderText] = React.useState("");


    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
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
                    <Drawer open={state} onClose={toggleDrawer(false)}>
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
                        <TextField id="outlined-basic" label="Query" variant="outlined" value={sliderText}/>
                    </Drawer>
                </React.Fragment>
            </div>
            <Map
                altitudes={slider}>
            </Map>
        </div>
    );
}
