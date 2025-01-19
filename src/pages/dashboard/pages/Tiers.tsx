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

type Tier = {
	id: string;
	name: string;
	requirement: number;
	created_at: Date;
	updated_at: Date;
};

// Mock data for Tiers
const mockTiers = [
	{
		id: "1",
		name: "Silver",
		requirement: 10,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: "2",
		name: "Gold",
		requirement: 20,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const Tiers = () => {
	const [tiers, setTiers] = useState(mockTiers);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editTier, setEditTier] = useState<Tier | null>(null);
	const [newTier, setNewTier] = useState<Tier>({
		id: "",
		name: "",
		requirement: 0,
		created_at: new Date(),
		updated_at: new Date(),
	});

	const handleAddTier = () => {
		setNewTier({
			id: "", // Placeholder ID
			name: "",
			requirement: 0,
			created_at: new Date(), // Default current date
			updated_at: new Date(), // Default current date
		});
		setIsModalOpen(true);
	};

	const handleEditTier = (tier: Tier) => {
		setEditTier(tier);
		setIsModalOpen(true);
	};

	const handleDeleteTier = (id: string) => {
		setTiers((prev) => prev.filter((tier) => tier.id !== id));
	};

	const handleSaveTier = () => {
		if (editTier) {
			setTiers((prev) =>
				prev.map((tier) =>
					tier.id === editTier.id ? { ...tier, ...editTier } : tier
				)
			);
		} else {
			const newId = Date.now().toString();
			setTiers((prev) => [
				...prev,
				{
					...newTier,
					id: newId,
					created_at: new Date(),
					updated_at: new Date(),
				},
			]);
		}
		setEditTier(null);
		setNewTier({
			id: "",
			name: "",
			requirement: 0,
			created_at: new Date(),
			updated_at: new Date(),
		});
		setIsModalOpen(false);
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>Tiers</h1>
			<Button
				startContent={<Plus />}
				onPress={handleAddTier}
				className='mb-4'
			>
				Add Tier
			</Button>
			<Table aria-label='Tiers Table'>
				<TableHeader>
					<TableColumn>Name</TableColumn>
					<TableColumn>Requirement</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{tiers.map((tier) => (
						<TableRow key={tier.id}>
							<TableCell>{tier.name}</TableCell>
							<TableCell>{tier.requirement}</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Edit
										className='cursor-pointer text-blue-500'
										onClick={() => handleEditTier(tier)}
									/>
									<Trash2
										className='cursor-pointer text-red-500'
										onClick={() => handleDeleteTier(tier.id)}
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
					<ModalHeader>{editTier ? "Edit Tier" : "Add Tier"}</ModalHeader>
					<ModalBody>
						<Input
							label='Tier Name'
							value={(editTier || newTier)?.name || ""}
							onChange={(e) => {
								const value = e.target.value;
								if (editTier) {
									setEditTier((prev) =>
										prev ? { ...prev, name: value } : null
									);
								} else {
									setNewTier((prev) => ({ ...prev, name: value }));
								}
							}}
						/>
						<Input
							label='Requirement'
							type='number'
							value={((editTier || newTier)?.requirement || 0).toString()}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (editTier) {
									setEditTier((prev) =>
										prev ? { ...prev, requirement: value } : null
									);
								} else {
									setNewTier((prev) => ({ ...prev, requirement: value }));
								}
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
						<Button onPress={handleSaveTier}>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Tiers;
