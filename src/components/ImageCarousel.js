import React, { useState } from "react";
import Carousel from "react-simply-carousel";
import Backdrop from '@mui/material/Backdrop';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@material-ui/icons/Close';

import "./css/ImageCarousel.css";

export default function SimpleBackdrop({ marker }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Box className="image-open-button">
                <Button onClick={handleToggle}>Images</Button>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Fab
                    className="close-image-backdrop"
                    color="secondary"
                    aria-label="edit"
                    onClick={handleClose}>
                    <CloseIcon/>
                </Fab>
                <ImageCarousel
                    marker={marker}
                >
                </ImageCarousel>
            </Backdrop>
        </div>
    );
}

function ImageCarousel({ marker }) {
    const [activeSlide, setActiveSlide] = useState(0);

    if (marker.images.length > 0)
        return (
            <Carousel
                activeSlideIndex={activeSlide}
                onRequestChange={setActiveSlide}
                itemsToShow={1}
                itemsToScroll={1}
                containerProps={{
                    style: {
                        width: "100%",
                        justifyContent: "space-between"
                    }
                }}
                forwardBtnProps={{
                    children: ">",
                    style: {
                        width: 30,
                        height: 60,
                        minWidth: 30,
                        padding: 0,
                        alignSelf: "center"
                    }
                }}
                backwardBtnProps={{
                    children: "<",
                    style: {
                        width: 30,
                        padding: 0,
                        height: 60,
                        minWidth: 30,
                        alignSelf: "center"
                    }
                }}
                speed={400}
            >
                {marker.images.map((image, i) => {
                    return (
                        <div className="imageWrapper" key={i + "-" + marker.name + "_div"}>
                            <img className="image" key={i + "-" + marker.name} style={{width: "80vw"}} src={image} alt="not" />
                        </div>);
                })}
            </Carousel>
        );
    else
        return "";
}
