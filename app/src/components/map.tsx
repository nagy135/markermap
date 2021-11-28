import GoogleMapReact from "google-map-react";

import { useDispatch, useSelector } from "react-redux";
import { LogState } from "../store/logReducer";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { slovakiaCenter } from "../utils/constants";
import useMapLogin from "../hooks/useMapLogin";
import { getRecords, TRecordResponse } from "../utils/record";

export default function Map(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector<LogState>(
    (state) => state.userId as string | null
  );
  useMapLogin();

  const logOut = () => {
    localStorage.removeItem("loginToken");
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();
  const [visited, setVisited] = useState<TRecordResponse[]>([]);
  const shownRecords: Record<string, google.maps.Marker> = {};

  const defaultProps = {
    center: {
      lat: slovakiaCenter.lat,
      lng: slovakiaCenter.lng,
    },
    zoom: 8,
  };

  useEffect(() => {
    (async () => {
      const records = await getRecords();
      setVisited(records);
    })();
  }, []);

  const storeInstance = (map: any) => setMapInstance(map);

  useEffect(() => {
    if (!visited || !mapInstance) return;
    visited
      .filter((item) => !(item.id in shownRecords))
      .map((item) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(item.lat, item.lon),
          title: item.name + " (" + item.altitude + "m. n. m.)",
          label: item.name,
        });
        shownRecords[item.id] = marker;

        marker.setMap(mapInstance);
        marker.addListener("click", () => {
          const position = marker.getPosition();
          if (position) mapInstance.setCenter(position);
          // props.markerClicked();
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
      });
  }, [visited, mapInstance]);

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
          onGoogleApiLoaded={({ map }) => storeInstance(map)}
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
