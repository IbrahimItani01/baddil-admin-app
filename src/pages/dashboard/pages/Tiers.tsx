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
	addTier,
	deleteTier,
	editTierReducer,
	Tier,
} from "../../../../store/slices/tiers.slice";

const Tiers = () => {
	const dispatch = useAppDispatch();
	const tiers = useAppSelector((state) => state.tiers.tiersData);
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
			id: "",
			name: "",
			requirement: 0,
			created_at: new Date(),
			updated_at: new Date(),
		});
		setEditTier(null);
		setIsModalOpen(true);
	};

	const handleEditTier = (tier: Tier) => {
		setEditTier(tier);
		setIsModalOpen(true);
	};

	const handleDeleteTier = (id: string) => {
		dispatch(deleteTier(id));
	};

	const handleSaveTier = () => {
		if (editTier) {
			dispatch(editTierReducer({ id: editTier.id, updatedTier: editTier }));
		} else {
			const newId = Date.now().toString();
			dispatch(
				addTier({
					...newTier,
					id: newId,
					created_at: new Date(),
					updated_at: new Date(),
				})
			);
		}
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
