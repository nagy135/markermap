const visitedPlaces = [
    {
        name: "Sitno",
        lat: 48.4023742,
        lng: 18.8661295,
        altitude: 1009
    }
];
function initMap() {
    const slovakiaCenter = { lat: 48.6670441, lng: 19.7785865 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: slovakiaCenter,
    });

    for (const place of visitedPlaces){
        new google.maps.Marker({
            position: {
                lat: place.lat,
                lng: place.lng,
            },
            map,
            label: place.name,
            title: place.name + " (" + place.altitude + "m)"
        });
    };
}
