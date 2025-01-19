import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  { name: 'Beirut', latitude: 33.8938, longitude: 35.5018 },
  { name: 'Jounieh', latitude: 34.0057, longitude: 35.657 },
  { name: 'Tyre', latitude: 33.2713, longitude: 35.2035 },
];

const LocationsOverview = () => {
  return (
    <div className='w-full flex flex-col gap-2'>
    <h1 className='text-2xl font-semibold'>Locations</h1>
    <MapContainer
      center={[locations[0].latitude, locations[0].longitude]}
      zoom={8}
      scrollWheelZoom={false}
      className="w-full h-[500px] rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
        >
          <Popup interactive>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>

  );
};

export default LocationsOverview;
