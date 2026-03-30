import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation({ lat, lng });
    },
  });
  return null;
}

export default function AdminMap() {
  const [position, setPosition] = useState(null);

  return (
    <div style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer
        center={[4.2105, 101.9758]} // Malaysia center
        zoom={6}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationPicker setLocation={setPosition} />

        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>
    </div>
  );
}