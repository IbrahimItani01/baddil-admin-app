import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useState } from "react";

// Mock data for Barters with Locations
const mockBartersWithLocations = [
	{
		id: "1",
		user1_email: "user1@example.com",
		user2_email: "user2@example.com",
		status: "ongoing",
		handled_by_ai: "AI1",
		location: {
			name: "New York",
			latitude: 40.7128,
			longitude: -74.006,
		},
	},
	{
		id: "2",
		user1_email: "user3@example.com",
		user2_email: "user4@example.com",
		status: "completed",
		handled_by_ai: "AI2",
		location: {
			name: "Los Angeles",
			latitude: 34.0522,
			longitude: -118.2437,
		},
	},
];

const BartersLocations = () => {
	const [barters, setBarters] = useState(mockBartersWithLocations);

	return (
		<Table aria-label='Barters Table with Location'>
			<TableHeader>
				<TableColumn>User 1</TableColumn>
				<TableColumn>User 2</TableColumn>
				<TableColumn>Status</TableColumn>
				<TableColumn>Handled By AI</TableColumn>
				<TableColumn>Location</TableColumn>
			</TableHeader>
			<TableBody>
				{barters.map((barter) => (
					<TableRow key={barter.id}>
						<TableCell>{barter.user1_email}</TableCell>
						<TableCell>{barter.user2_email}</TableCell>
						<TableCell>{barter.status}</TableCell>
						<TableCell>{barter.handled_by_ai}</TableCell>
						<TableCell>
							{barter.location ? (
								<div>
									<strong>{barter.location.name}</strong>
									<br />
									Lat: {barter.location.latitude}, Long:{" "}
									{barter.location.longitude}
								</div>
							) : (
								"No location"
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default BartersLocations;
