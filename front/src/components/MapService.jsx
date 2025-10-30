import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Fix icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- Composant utilitaire pour ajuster la vue ---
function FitBounds({ positions }) {
    const map = useMap();

    useEffect(() => {
        if (!positions || positions.length === 0) return;

        if (positions.length === 1) {
            // Un seul point : centrer et zoomer
            const [lat, lon] = positions[0];
            map.setView([lat, lon], 15);
        } else {
            // Plusieurs points : ajuster les bornes
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);

    return null;
}

// --- Composant principal ---
export default function MapService({ latitude, longitude, nom, positions }) {
    // Si on reçoit une liste de positions
    let markerList = [];

    if (positions && Array.isArray(positions) && positions.length > 0) {
        markerList = positions
            .filter(
                (p) =>
                    p.latitude &&
                    p.longitude &&
                    !isNaN(parseFloat(p.latitude)) &&
                    !isNaN(parseFloat(p.longitude))
            )
            .map((p) => ({
                lat: parseFloat(p.latitude),
                lon: parseFloat(p.longitude),
                nom: p.nom || "Service public",
            }));
    } else if (latitude && longitude) {
        // Mode : un seul point de coordonnées
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lon)) {
            markerList = [{ lat, lon, nom }];
        }
    }

    if (markerList.length === 0) return null;

    const center = [markerList[0].lat, markerList[0].lon];

    return (
        <MapContainer
            center={center}
            zoom={15}
            style={{
                height: "400px",
                width: "100%",
                maxWidth: "900px",
                borderRadius: "12px",
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {markerList.map((m, index) => (
                <Marker key={index} position={[m.lat, m.lon]}>
                    <Popup>{m.nom}</Popup>
                </Marker>
            ))}
            <FitBounds positions={markerList.map((m) => [m.lat, m.lon])} />
        </MapContainer>
    );
}
