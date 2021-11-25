import GoogleMapReact from "google-map-react";
import React from "react";

import { visited, slovakiaCenter } from "../resources/locations";

import { useDispatch } from "react-redux";
import { change } from "../slices/markerSlice";

function Map(props) {
  const dispatch = useDispatch();

  const [markers, setMarkers] = React.useState([]);

  const [mapInstance, setMapInstance] = React.useState(null);

  const defaultProps = {
    center: {
      lat: slovakiaCenter.lat,
      lng: slovakiaCenter.lng,
    },
    zoom: 8,
  };

  const renderMarkers = (map, maps) => {
    setMapInstance(map);

    let newMarkers = [];
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
        dispatch(
          change({
            name: item.name,
            lat: item.lat,
            lng: item.lng,
            altitude: item.altitude,
            images: visited[item.id].images,
          })
        );
      });
      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  };

  const onAltitudesChange = (values) => {
    markers.map((item) => {
      if (item.altitude < values[0] || item.altitude > values[1])
        item.setMap(null);
      else if (item.map == null) item.setMap(mapInstance);
    });
  };

  React.useEffect(() => {
    onAltitudesChange(props.altitudes);
  }, [props.altitudes]);

  return (
    // Important! Always set the container height explicitly
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
  );
}

export default Map;
