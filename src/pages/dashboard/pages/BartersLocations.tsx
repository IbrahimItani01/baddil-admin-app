import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useAppSelector } from "../../../../store/store";

const BartersLocations = () => {
	const bartersData = useAppSelector((state) => state.barters.bartersData);

	return (
		<Table aria-label='Barters Table with Location'>
			<TableHeader>
				<TableColumn>Barter ID</TableColumn>
				<TableColumn>User 1 Email</TableColumn>
				<TableColumn>User 2 Email</TableColumn>
				<TableColumn>Location</TableColumn>
			</TableHeader>
			<TableBody>
				{bartersData.map((barter) => (
					<TableRow key={barter.id}>
						<TableCell>{barter.id}</TableCell>
						<TableCell>{barter.user1.email}</TableCell>
						<TableCell>{barter.user2.email}</TableCell>
						<TableCell>
							{barter.meetup?.location ? (
								<div>
									<strong>{barter.meetup.location.name}</strong>
									<br />
									Lat: {barter.meetup.location.latitude}, Long:{" "}
									{barter.meetup.location.longitude}
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
