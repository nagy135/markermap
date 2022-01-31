import { useSelector } from "react-redux";

import { TRootStore } from "../store";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_ENDPOINT } from "../utils/constants";

import "./css/images.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type TImageProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export default function Images(props: TImageProps) {
  const selectedRecord = useSelector(
    (state: TRootStore) => state.map.selectedRecord
  );
  return props.open && selectedRecord ? (
    <div
      style={{
        position: "absolute",
        zIndex: 9999,
        width: "80vw",
        height: "80vh",
        left: "10vw",
        top: "10vh",
      }}
    >
      <button onClick={() => props.setOpen(false)}>X</button>
      <Carousel
        containerClass="carousel-container"
        itemClass="carousel-item"
        responsive={responsive}
      >
        {selectedRecord.images.map((image, k) => (
          <img
            key={`image_${k}`}
            src={`${API_ENDPOINT}/${image.path}`}
            alt=""
          />
        ))}
      </Carousel>
    </div>
  ) : (
    <></>
  );
}
