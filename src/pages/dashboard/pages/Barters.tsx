import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
	addBarter,
	Barter,
	deleteBarter,
	Location,
	setBartersData,
	setLocationsData,
} from "../../../../store/slices/barters.slice";

const BartersList = () => {
	const dispatch = useAppDispatch();
	const barters = useAppSelector((state) => state.barters.bartersData);
	const [editBarter, setEditBarter] = useState<Barter | null>(null);
	const [newBarter, setNewBarter] = useState<Barter>({
		id: "",
		user1: { email: "" },
		user2: { email: "" },
		meetup: { location: { name: "", latitude: 0, longitude: 0 } },
		created_at: new Date(),
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddBarter = () => {
		setNewBarter({
			id: "",
			user1: { email: "" },
			user2: { email: "" },
			meetup: { location: { name: "", latitude: 0, longitude: 0 } },
			created_at: new Date(),
		});
		setEditBarter(null);
		setIsModalOpen(true);
	};

	const handleEditBarter = (barter: Barter) => {
		setEditBarter(barter);
		setIsModalOpen(true);
	};

	const handleDeleteBarter = (id: string) => {
		dispatch(deleteBarter(id));
	};

	const handleSaveBarter = () => {
		if (editBarter) {
			const updatedBarters = barters.map((item) =>
				item.id === editBarter.id ? editBarter : item
			);

			dispatch(setBartersData(updatedBarters));

			const locations = updatedBarters.reduce((acc, barter) => {
				if (barter.meetup?.location) {
					const { name, latitude, longitude } = barter.meetup.location;
					acc[name] = { name, latitude, longitude };
				}
				return acc;
			}, {} as Record<string, Location>);
			dispatch(setLocationsData(locations));
		} else {
			const newId = Date.now().toString();
			dispatch(addBarter({ ...newBarter, id: newId }));
		}
		setIsModalOpen(false);
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>Barters</h1>
			<Button
				startContent={<Plus />}
				onPress={handleAddBarter}
				className='mb-4'
			>
				Add Barter
			</Button>
			<Table aria-label='Barters Table'>
				<TableHeader>
					<TableColumn>User 1</TableColumn>
					<TableColumn>User 2</TableColumn>
					<TableColumn>Location</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{barters.map((barter) => (
						<TableRow key={barter.id}>
							<TableCell>{barter.user1.email}</TableCell>
							<TableCell>{barter.user2.email}</TableCell>
							<TableCell>
								{barter.meetup.location.name} ({barter.meetup.location.latitude}
								, {barter.meetup.location.longitude})
							</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Edit
										className='cursor-pointer text-blue-500'
										onClick={() => handleEditBarter(barter)}
									/>
									<Trash2
										className='cursor-pointer text-red-500'
										onClick={() => handleDeleteBarter(barter.id)}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<ModalContent>
					<ModalHeader>{editBarter ? "Edit Barter" : "Add Barter"}</ModalHeader>
					<ModalBody>
						<Input
							label='User 1 Email'
							value={newBarter.user1.email}
							onChange={(e) =>
								setNewBarter({ ...newBarter, user1: { email: e.target.value } })
							}
						/>
						<Input
							label='User 2 Email'
							value={newBarter.user2.email}
							onChange={(e) =>
								setNewBarter({ ...newBarter, user2: { email: e.target.value } })
							}
						/>
						<Input
							label='Location Name'
							value={newBarter.meetup.location.name}
							onChange={(e) =>
								setNewBarter({
									...newBarter,
									meetup: {
										location: {
											...newBarter.meetup.location,
											name: e.target.value,
										},
									},
								})
							}
						/>
						<Input
							label='Latitude'
							value={newBarter.meetup.location.latitude.toString()}
							onChange={(e) =>
								setNewBarter({
									...newBarter,
									meetup: {
										location: {
											...newBarter.meetup.location,
											latitude: parseFloat(e.target.value),
										},
									},
								})
							}
						/>
						<Input
							label='Longitude'
							value={newBarter.meetup.location.longitude.toString()}
							onChange={(e) =>
								setNewBarter({
									...newBarter,
									meetup: {
										location: {
											...newBarter.meetup.location,
											longitude: parseFloat(e.target.value),
										},
									},
								})
							}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							variant='flat'
							color='danger'
							onPress={() => setIsModalOpen(false)}
						>
							Cancel
						</Button>
						<Button onPress={handleSaveBarter}>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default BartersList;
