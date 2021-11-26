import GoogleMapReact from "google-map-react";

import { useDispatch, useSelector } from "react-redux";
import { LogState } from "../store/logReducer";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { performLogIn } from "../utils/log";
import { slovakiaCenter } from "../utils/constants";

export default function Map(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector<LogState>(
    (state) => state.userId as string | null
  );
  useEffect(() => {
    (async () => {
      const loginToken = localStorage.getItem("loginToken");
      if (loginToken) {
        const response = await performLogIn({
          loginToken,
        });
        dispatch({ type: "LOG_IN", payload: { userId: response.id } });
      }
    })();
  }, []);

  const logOut = () => {
    localStorage.removeItem("loginToken");
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  const [mapInstance, setMapInstance] = useState(null);

  const defaultProps = {
    center: {
      lat: slovakiaCenter.lat,
      lng: slovakiaCenter.lng,
    },
    zoom: 8,
  };

  const visited = [
    {
      id: 0,
      name: "Sitno",
      lat: 48.402543576540275,
      lng: 18.877049945323773,
      altitude: 1009,
    },
  ];

  const renderMarkers = (map: any, maps: any) => {
    setMapInstance(map);

    let newMarkers: any[] = [];
    visited.map((item) => {
      const marker = new maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map,
        altitude: item.altitude,
        title: item.name + " (" + item.altitude + "m. n. m.)",
        label: item.name,
      });
      marker.addListener("click", () => {
        map.setCenter(marker.getPosition());
        props.markerClicked();
        // dispatch(
        //   change({
        //     name: item.name,
        //     lat: item.lat,
        //     lng: item.lng,
        //     altitude: item.altitude,
        //     images: visited[item.id].images,
        //   })
        // );
      });
      newMarkers.push(marker);
    });
    // setMarkers(newMarkers);
  };

  return (
    <>
      <Button
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 9999,
          margin: 8,
          marginTop: 20,
        }}
        size="large"
        color="warning"
        variant="contained"
        onClick={() => logOut()}
      >
        Log OUT
      </Button>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBEPCDqimEMFijE3Oo0w22qn6dh8ql2Zg4&",
            v: "beta",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          // layerTypes={['TransitLayer', 'TrafficLayer']}
          options={() => {
            return {
              panControl: true,
              tilt: 40.0,
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true,
              scrollwheel: true,
            };
          }}
        ></GoogleMapReact>
      </div>
    </>
  );
}
