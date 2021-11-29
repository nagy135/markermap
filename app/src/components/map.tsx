import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { defaultMapCenter, defaultZoom } from "../utils/constants";
import useMapLogin from "../hooks/useMapLogin";
import { getRecords, TRecordResponse } from "../utils/record";
import { toast } from "../utils/toast";
import { TRootStore } from "../store";

export default function Map(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state: TRootStore) => state.log.userId);
  const selectedMarker = useSelector(
    (state: TRootStore) => state.map.selectedMarker
  );
  useMapLogin();

  const logOut = () => {
    localStorage.removeItem("loginToken");
    dispatch({ type: "LOG_OUT" });
    navigate("/");
  };

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();
  const [visited, setVisited] = useState<TRecordResponse[]>([]);
  const [shownRecords, setShownRecords] = useState<
    Record<string, google.maps.Marker>
  >({});

  useEffect(() => {
    (async () => {
      const records = await getRecords();
      toast("Records loaded");
      setVisited(records);
    })();
  }, []);

  useEffect(() => {
    if (!selectedMarker || !(selectedMarker in shownRecords)) return;
    const marker = shownRecords[selectedMarker];
    const position = marker.getPosition();
    if (position && mapInstance) mapInstance.setCenter(position);
  }, [selectedMarker, shownRecords]);

  const storeInstance = (map: google.maps.Map) => setMapInstance(map);

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
        setShownRecords({
          ...shownRecords,
          [item.id]: marker,
        });

        marker.setMap(mapInstance);
        marker.addListener("click", () => {
          dispatch({
            type: "SELECT",
            payload: {
              selectedMarker: item.id,
            },
          });
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
          defaultCenter={defaultMapCenter}
          defaultZoom={defaultZoom}
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
