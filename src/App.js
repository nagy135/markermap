import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function SimpleMap(){

    const slovakiaCenter = { lat: 48.6670441, lng: 19.7785865 };
    const visitedPlaces = [
        {
            name: "Sitno",
            lat: 48.4023742,
            lng: 18.8661295,
            altitude: 1009
        },
        {
            name: "Salatin",
            lat: 48.9805536,
            lng: 19.3449904,
            altitude: 1630
        },

    ];

    const defaultProps = {
        center: {
            lat: slovakiaCenter.lat,
            lng: slovakiaCenter.lng
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBEPCDqimEMFijE3Oo0w22qn6dh8ql2Zg4&" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {visitedPlaces.map((item, index) => (
                    <AnyReactComponent
                        lat={item.lat}
                        lng={item.lng}
                        text={item.name + " (" + item.altitude + ")"}
                    />
                ))}
                <AnyReactComponent
                    className="slovakia-center"
                    lat={slovakiaCenter.lat}
                    lng={slovakiaCenter.lng}
                    text="+"
                />
            </GoogleMapReact>
        </div>
    );
}
