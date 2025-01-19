import React, { useState } from "react";
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

// Mock data for Barters
const mockBarters = [
	{
		id: "1",
		user1_email: "user1@example.com",
		user2_email: "user2@example.com",
		status: "ongoing",
		handled_by_ai: "AI1",
		meetup_id: null,
		completed_at: null,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: "2",
		user1_email: "user3@example.com",
		user2_email: "user4@example.com",
		status: "completed",
		handled_by_ai: "AI2",
		meetup_id: null,
		completed_at: new Date(),
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const BartersList = () => {
	const [barters, setBarters] = useState(mockBarters);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editBarter, setEditBarter] = useState<any>(null);
	const [newBarter, setNewBarter] = useState<any>({
		user1_email: "",
		user2_email: "",
		status: "ongoing",
		handled_by_ai: "",
	});

	const handleAddBarter = () => {
		setNewBarter({
			user1_email: "",
			user2_email: "",
			status: "ongoing",
			handled_by_ai: "",
		});
		setIsModalOpen(true);
	};

	const handleEditBarter = (barter: any) => {
		setEditBarter(barter);
		setIsModalOpen(true);
	};

	const handleDeleteBarter = (id: string) => {
		setBarters((prev) => prev.filter((item) => item.id !== id));
	};

	const handleSaveBarter = () => {
		if (editBarter) {
			setBarters((prev) =>
				prev.map((item) =>
					item.id === editBarter.id ? { ...editBarter } : item
				)
			);
		} else {
			const newId = Date.now().toString();
			setBarters((prev) => [...prev, { ...newBarter, id: newId }]);
		}
		setEditBarter(null);
		setNewBarter({
			user1_email: "",
			user2_email: "",
			status: "ongoing",
			handled_by_ai: "",
		});
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
					<TableColumn>Status</TableColumn>
					<TableColumn>Handled By AI</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{barters.map((barter) => (
						<TableRow key={barter.id}>
							<TableCell>{barter.user1_email}</TableCell>
							<TableCell>{barter.user2_email}</TableCell>
							<TableCell>{barter.status}</TableCell>
							<TableCell>{barter.handled_by_ai}</TableCell>
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
							value={(editBarter || newBarter)?.user1_email || ""}
							onChange={(e) => {
								const value = e.target.value;
								editBarter
									? setEditBarter({ ...editBarter, user1_email: value })
									: setNewBarter({ ...newBarter, user1_email: value });
							}}
						/>
						<Input
							label='User 2 Email'
							value={(editBarter || newBarter)?.user2_email || ""}
							onChange={(e) => {
								const value = e.target.value;
								editBarter
									? setEditBarter({ ...editBarter, user2_email: value })
									: setNewBarter({ ...newBarter, user2_email: value });
							}}
						/>
						<Input
							label='Handled By AI'
							value={(editBarter || newBarter)?.handled_by_ai || ""}
							onChange={(e) => {
								const value = e.target.value;
								editBarter
									? setEditBarter({ ...editBarter, handled_by_ai: value })
									: setNewBarter({ ...newBarter, handled_by_ai: value });
							}}
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
