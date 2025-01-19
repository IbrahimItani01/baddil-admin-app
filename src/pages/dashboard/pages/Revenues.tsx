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

const mockProfits = [
	{ id: "1", amount: 1000, date: "2025-01-10", source: "subscription" },
	{ id: "2", amount: 1500, date: "2025-01-12", source: "hire_budget" },
];

const profitSources = ["subscription", "hire_budget", "ads"];
type ProfitRecord = {
	id?: string | undefined;
	amount: number;
	source: string;
	date: string;
};

const ProfitsTable = () => {
	const [data, setData] = useState<ProfitRecord[]>(mockProfits);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editRecord, setEditRecord] = useState<ProfitRecord | null>(null);
	const [newRecord, setNewRecord] = useState<ProfitRecord>({
		id: "",
		amount: 0,
		source: "",
		date: new Date().toISOString().slice(0, 10),
	});

	const handleAddRecord = () => {
		setNewRecord({
			amount: 0,
			source: "",
			date: new Date().toISOString().slice(0, 10),
		});
		setIsModalOpen(true);
	};

	const handleEditRecord = (record: ProfitRecord) => {
		setEditRecord(record);
		setIsModalOpen(true);
	};

	const handleDeleteRecord = (id: string | undefined) => {
		setData((prev) => prev.filter((item) => item.id !== id));
	};

	const handleSaveRecord = () => {
		if (editRecord) {
			setData((prev) =>
				prev.map((item) =>
					item.id === editRecord.id ? { ...item, ...editRecord } : item
				)
			);
		} else {
			const newId = Date.now().toString();
			setData((prev) => [...prev, { ...newRecord, id: newId }]);
		}
		setEditRecord(null);
		setNewRecord({
			amount: 0,
			source: "",
			date: new Date().toISOString().slice(0, 10),
		});
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
					{data.map((record) => (
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
							value={((editRecord || newRecord)?.amount || "").toString()} // Convert to string
							onChange={(e) => {
								const value = e.target.value;
								const numericValue = parseFloat(value); // Convert input to a number
								if (!isNaN(numericValue)) {
									if (editRecord) {
										setEditRecord({ ...editRecord, amount: numericValue });
									} else {
										setNewRecord({ ...newRecord, amount: numericValue });
									}
								}
							}}
						/>

						<Dropdown>
							<DropdownTrigger>
								<Button>
									{(editRecord?.source || newRecord.source) ?? "Select Source"}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label='Select Source'
								onAction={(key) => {
									const source = key.toString(); // Convert `key` to `string`
									if (editRecord) {
										setEditRecord((prev) =>
											prev ? { ...prev, source } : prev
										);
									} else {
										setNewRecord((prev) => ({ ...prev, source }));
									}
								}}
							>
								{profitSources.map((source) => (
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
