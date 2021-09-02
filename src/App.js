import React from "react";
import GoogleMapReact from 'google-map-react';
import './App.css';

export default function SimpleMap(){

    const slovakiaCenter = { lat: 48.6670441, lng: 19.7785865 };
    const visitedPlaces = [
        {
            name: "Sitno",
            lat: 48.402543576540275,
            lng: 18.877049945323773,
            altitude: 1009
        },
        {
            name: "Salatin",
            lat: 48.98032903440475,
            lng: 19.36288620314865,
            altitude: 1630
        },

    ];

    const defaultProps = {
        center: {
            lat: slovakiaCenter.lat,
            lng: slovakiaCenter.lng
        },
        zoom: 8
    };

    const renderMarkers = (map, maps) => {
        visitedPlaces.map((item) => {
            new maps.Marker({
                position: { lat: item.lat, lng: item.lng },
                map,
                title: item.name + ' (' + item.altitude + 'm. n. m.)',
                label: item.name
            });
        });
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyBEPCDqimEMFijE3Oo0w22qn6dh8ql2Zg4&" ,
                    v: "beta"
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


                    } } }
            >
            </GoogleMapReact>
        </div>
    );
}
