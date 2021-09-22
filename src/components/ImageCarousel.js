import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./css/ImageCarousel.css";

export default function BasicModal({marker}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button className="image-open-button" onClick={handleOpen}>Images</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="carousel-wrapper">
                    <ImageCarousel
                        marker={marker}>
                    </ImageCarousel>
                </Box>
            </Modal>
        </>
    );
}

function ImageCarousel({ marker }) {
    if (marker.images.length > 0)
        return (
            <Carousel
                showThumbs={false}
            >
                {marker.images.map((image, i) => {
                    return (
                        <div className="imageWrapper" key={i + "-" + marker.name + "_div"}>
                            <img className="image" key={i + "-" + marker.name} src={image} alt="not" />
                        </div>);
                })}
            </Carousel>
        );
    else
        return "";
}
