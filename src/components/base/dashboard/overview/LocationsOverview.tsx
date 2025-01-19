import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppSelector } from "../../../../../store/store";

const LocationsOverview = () => {
	const { locations } = useAppSelector((state) => state.locations);

	return (
		<div className='w-full flex flex-col gap-2'>
			<h1 className='text-2xl font-semibold'>Locations</h1>
			<MapContainer
				center={[
					locations[0]?.latitude || 33.8938,
					locations[0]?.longitude || 35.5018,
				]}
				zoom={8}
				scrollWheelZoom={false}
				className='w-full h-[500px] rounded-lg shadow-lg'
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{locations.map((location) => (
					<Marker
						key={location.id}
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
