import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, useMapEvents } from "react-leaflet";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import icon from "../Images/icon.png";
import L from "leaflet";

function getColor(d) {
    return d > 300000 ? '#800026' :
        d > 270000 ? '#BD0026' :
            d > 235000 ? '#E31A1C' :
                d > 200000 ? '#FC4E2A' :
                    d > 170000 ? '#FD8D3C' :
                        d > 135000 ? '#FEB24C' :
                            d > 100000 ? '#FED976' :
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

const center = {
    lat: 45.757340578158875,
    lng: 3.1332783632223067
  }
  

function DraggableMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    console.log(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            draggable={false}
            eventHandlers={eventHandlers}
            position={position}
            icon={props.icon}
            ref={markerRef}>
        </Marker>
    )
}

export default function Map({ coords, display_name }) {

    const { latitude, longitude } = coords;

    const [currentCoords, setCurrentCoords] = useState({
        latitude: 39.7837304,
        longitude: -100.4458825
    });
    const [geojsonData, setGeojsonData] = useState(null);

    function handleClick(e) {
        console.log(e.latlng);
    }

    useEffect(() => {
        setCurrentCoords(coords);
        // Fetch GeoJSON data from API                                                                                                                                      
        fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248c5a250173e5148ccb0c368f7d8a63d15&start=3.0851,45.7754&end=3.133,45.757')
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
        currentCoords && (
            <MapContainer
                classsName="map"
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "40vh", width: "100%" }}
                on
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
                contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={customIcon} position={[latitude, longitude]}>
                    <Popup>{display_name}</Popup>
                </Marker>
                {/* <MarkerMove coords={[latitude, longitude]} customIcon={customIcon} /> */}
                <DraggableMarker icon={customIcon} />
                {geojsonData && <GeoJSON data={geojsonData} />}
                <MapView currentCoords={currentCoords} />
            </MapContainer>
        )

    );
}
