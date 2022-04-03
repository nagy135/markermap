import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { defaultMapCenter, defaultZoom } from "../utils/constants";
import { getRecords, TRecordResponse } from "../utils/record";
import { toast } from "../utils/toast";
import { TRootStore } from "../store";
import Detail from "./detail";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "./css/map.css";

export default function Map(_props: any) {
  const dispatch = useDispatch();
  let user = useSessionContext();

  const selectedRecord = useSelector(
    (state: TRootStore) => state.map.selectedRecord
  );

  const logOut = async () => {
    await signOut();
    window.location.href = "/auth";
  };

  const addRecord = async () => {
    window.location.href = "/add";
  };

  const [mapInstance, setMapInstance] = useState<google.maps.Map>();
  const [visited, setVisited] = useState<TRecordResponse[]>([]);
  const [shownRecords, setShownRecords] = useState<
    Record<string, google.maps.Marker>
  >({});

  /**
   * Redirects to adder page with prefilled lat/lon
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  const addPrefilledRecord = (lat: number, lng: number) => {
    if (window.confirm("Create new record here?"))
      window.location.href = `/add?lat=${lat}&lng=${lng}`;
  };

  useEffect(() => {
    (async () => {
      const records = await getRecords();
      toast("Records loaded");
      setVisited(records);
    })();
  }, []);

  useEffect(() => {
    if (!selectedRecord || !(selectedRecord.id in shownRecords)) return;
    const marker = shownRecords[selectedRecord.id];
    const position = marker.getPosition();
    if (position && mapInstance) mapInstance.setCenter(position);
  }, [selectedRecord, shownRecords]);

  const storeInstance = (map: google.maps.Map) => setMapInstance(map);

  useEffect(() => {
    if (!visited || !mapInstance) return;
    const newRecords: Record<string, google.maps.Marker> = {};
    visited
      .filter((item) => !(item.id in shownRecords))
      .map((item) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(item.lat, item.lon),
          title: item.name + " (" + item.altitude + "m. n. m.)",
          label: item.name,
        });

        marker.setMap(mapInstance);
        newRecords[item.id] = marker;
        marker.addListener("click", () => {
          dispatch({
            type: "SELECT",
            payload: {
              selectedRecord: item,
            },
          });
        });
      });

    setShownRecords({
      ...shownRecords,
      ...newRecords,
    });
  }, [visited, mapInstance]);

  return (
    <>
      <div className="map-buttons">
        <Button
          size="large"
          color="warning"
          variant="contained"
          onClick={logOut}
        >
          {user.doesSessionExist ? <span>LOG OUT</span> : <span>LOG IN</span>}
        </Button>
        {user.doesSessionExist ? (
          <Button
            size="large"
            color="info"
            variant="contained"
            onClick={addRecord}
          >
            Add
          </Button>
        ) : null}
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <Detail />
        <GoogleMapReact
          draggable={true}
          bootstrapURLKeys={{
            key: "AIzaSyBEPCDqimEMFijE3Oo0w22qn6dh8ql2Zg4&",
          }}
          defaultCenter={defaultMapCenter}
          defaultZoom={defaultZoom}
          onClick={(e) => addPrefilledRecord(e.lat, e.lng)}
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
