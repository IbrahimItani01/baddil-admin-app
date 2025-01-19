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
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
	addProfit,
	deleteProfit,
	editProfit,
	Profit,
	ProfitSource,
} from "../../../../store/slices/profits.slice";

const ProfitsTable = () => {
	const dispatch = useAppDispatch();
	const profitsData = useAppSelector((state) => state.profits.profitsData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editRecord, setEditRecord] = useState<Profit | null>(null);
	const [newRecord, setNewRecord] = useState<Partial<Profit>>({
		amount: 0,
		source: ProfitSource.SUBSCRIPTION,
		date: new Date().toISOString().slice(0, 10),
	});

	const handleAddRecord = () => {
		setNewRecord({
			amount: 0,
			source: ProfitSource.SUBSCRIPTION,
			date: new Date().toISOString().slice(0, 10),
		});
		setIsModalOpen(true);
	};

	const handleEditRecord = (record: Profit) => {
		setEditRecord(record);
		setIsModalOpen(true);
	};

	const handleDeleteRecord = (id: string) => {
		dispatch(deleteProfit(id));
	};

	const handleSaveRecord = () => {
		if (editRecord) {
			dispatch(editProfit({ id: editRecord.id, updatedProfit: editRecord }));
		} else {
			const newId = Date.now().toString();
			dispatch(
				addProfit({
					...newRecord,
					id: newId,
					created_at: new Date(),
					updated_at: new Date(),
				} as Profit)
			);
		}
		setEditRecord(null);
		setIsModalOpen(false);
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>Profits</h1>
			<Button
				startContent={<Plus />}
				onPress={handleAddRecord}
				className='mb-4'
			>
				Add Profit
			</Button>
			<Table aria-label='Profits Table'>
				<TableHeader>
					<TableColumn>Amount</TableColumn>
					<TableColumn>Source</TableColumn>
					<TableColumn>Date</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{profitsData.map((record) => (
						<TableRow key={record.id}>
							<TableCell>{record.amount}</TableCell>
							<TableCell>{record.source}</TableCell>
							<TableCell>
								{new Date(record.date).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Edit
										className='cursor-pointer text-blue-500'
										onClick={() => handleEditRecord(record)}
									/>
									<Trash2
										className='cursor-pointer text-red-500'
										onClick={() => handleDeleteRecord(record.id)}
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
					<ModalHeader>{editRecord ? "Edit Profit" : "Add Profit"}</ModalHeader>
					<ModalBody>
						<Input
							label='Amount'
							value={
								(editRecord
									? editRecord.amount
									: newRecord.amount
								)?.toString() || ""
							}
							onChange={(e) => {
								const value = parseFloat(e.target.value);
								if (!isNaN(value)) {
									if (editRecord) {
										setEditRecord({ ...editRecord, amount: value });
									} else {
										setNewRecord((prev) => ({ ...prev, amount: value }));
									}
								}
							}}
						/>
						<Dropdown>
							<DropdownTrigger>
								<Button>
									{editRecord?.source || newRecord.source || "Select Source"}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label='Select Source'
								onAction={(key) => {
									const source = key.toString() as ProfitSource;
									if (editRecord) {
										setEditRecord((prev) => ({ ...prev!, source }));
									} else {
										setNewRecord((prev) => ({ ...prev, source }));
									}
								}}
							>
								{Object.values(ProfitSource).map((source) => (
									<DropdownItem key={source}>{source}</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</ModalBody>
					<ModalFooter>
						<Button
							variant='flat'
							color='danger'
							onPress={() => setIsModalOpen(false)}
						>
							Cancel
						</Button>
						<Button onPress={handleSaveRecord}>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfitsTable;
