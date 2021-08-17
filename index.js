const visitedPlaces = [
    {
        name: "Krivan",
        lat: 49.1481947,
        lng: 19.9588182 
    }
];
function initMap() {
    const myLatLng = { lat: 49.1481947, lng: 19.9588182 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: myLatLng,
    });

    for (const place of visitedPlaces){
        new google.maps.Marker({
            position: {
                lat: place.lat,
                lng: place.lng,
            },
            map,
            label: place.name
        });
    };
}
