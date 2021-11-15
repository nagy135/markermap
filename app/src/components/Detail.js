import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import ImageCarousel from './ImageCarousel';
import { useSelector } from 'react-redux';

export default function Detail({open, close}){
    const marker = useSelector((state) => state.marker.selected);
    return (
        <div className="detail">
            <React.Fragment key="bottom">
                <Drawer anchor="right" open={open} onClose={close(false)}>
                    <Box
                        className="close">
                        <Fab
                            color="primary"
                            aria-label="edit"
                            onClick={close(false)}>
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
    );
};
