import React, { useState } from "react";
import Carousel from "react-simply-carousel";

function ImageCarousel(props) {
    const [activeSlide, setActiveSlide] = useState(0);

    if (props.marker.images.length > 0)
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
                        alignSelf: "center"
                    }
                }}
                backwardBtnProps={{
                    children: "<",
                    style: {
                        width: 30,
                        height: 60,
                        minWidth: 30,
                        alignSelf: "center"
                    }
                }}
                speed={400}
            >
                {props.marker.images.map((image, i) => {
                    return (
                        <div>
                            <img key={i + "-" + props.marker.name} style={{width: "150px"}} src={image} alt="not" />
                        </div>);
                })}
            </Carousel>
        );
    else
        return "";
}
export default ImageCarousel;
