import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import icon from "../Images/icon.png";
import L from "leaflet";

function getColor(d) {
    return d > 300000  ? '#800026' :
           d > 270000  ? '#BD0026' :
           d > 235000  ? '#E31A1C' :
           d > 200000  ? '#FC4E2A' :
           d > 170000  ? '#FD8D3C' :
           d > 135000  ? '#FEB24C' :
           d > 100000   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

export default function Map({ coords, display_name }) {

    const { latitude, longitude } = coords;

    const [geojsonData, setGeojsonData] = useState(null);

    useEffect(() => {
        // Fetch GeoJSON data from API
        fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c5a250173e5148ccb0c368f7d8a63d15&start=8.681495,49.41461&end=8.687872,49.420318')
            .then(response => response.json())
            .then(data => {
                setGeojsonData(data);
                console.log(data);
            });
    }, []);

    console.log(latitude);
    console.log(longitude);
    // console.log(longitude );
    // const { lat, long } = coords;

    const customIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [25, 35],
        iconAnchor: [5, 30]
    });

    function MapView() {
        let map = useMap();
        map.setView([latitude, longitude], map.getZoom());

        return null;
    }

    return (
        <MapContainer
            classsName="map"
            center={[latitude, longitude]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: "30vh", width: "80%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={customIcon} position={[latitude, longitude]}>
                <Popup>{display_name}</Popup>
            </Marker>
            {geojsonData && <GeoJSON data={geojsonData} />}
            <MapView />
        </MapContainer>
    );
}
