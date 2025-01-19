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

interface ExpenseRecord {
	id?: string;
	amount: number;
	date: string; // Ensured to be a string
	description: string;
	expense_type: string;
}

const mockExpenses = [
	{
		id: "1",
		amount: 500,
		date: "2025-01-10",
		description: "Salary for January",
		expense_type: "salary",
	},
	{
		id: "2",
		amount: 300,
		date: "2025-01-11",
		description: "Broker compensation",
		expense_type: "broker_compensation",
	},
];

const expenseTypes = ["salary", "broker_compensation", "office_supplies"];

const ExpensesTable = () => {
	const [data, setData] = useState<ExpenseRecord[]>(mockExpenses);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editRecord, setEditRecord] = useState<ExpenseRecord | null>(null);
	const [newRecord, setNewRecord] = useState<ExpenseRecord>({
		amount: 0,
		description: "",
		expense_type: "",
		date: new Date().toISOString().slice(0, 10),
	});

	const handleAddRecord = () => {
		setNewRecord({
			amount: 0,
			description: "",
			expense_type: "",
			date: new Date().toISOString().slice(0, 10),
		});
		setIsModalOpen(true);
	};

	const handleEditRecord = (record: ExpenseRecord) => {
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
					item.id === editRecord.id ? { ...editRecord } : item
				)
			);
		} else {
			const newId = Date.now().toString();
			setData((prev) => [...prev, { ...newRecord, id: newId }]);
		}
		setEditRecord(null);
		setNewRecord({
			amount: 0,
			description: "",
			expense_type: "",
			date: new Date().toISOString().slice(0, 10),
		});
		setIsModalOpen(false);
	};

	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>Expenses</h1>
			<Button
				startContent={<Plus />}
				onPress={handleAddRecord}
				className='mb-4'
			>
				Add Expense
			</Button>
			<Table aria-label='Expenses Table'>
				<TableHeader>
					<TableColumn>Amount</TableColumn>
					<TableColumn>Description</TableColumn>
					<TableColumn>Type</TableColumn>
					<TableColumn>Date</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{data.map((record) => (
						<TableRow key={record.id}>
							<TableCell>{record.amount}</TableCell>
							<TableCell>{record.description}</TableCell>
							<TableCell>{record.expense_type}</TableCell>
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
					<ModalHeader>
						{editRecord ? "Edit Expense" : "Add Expense"}
					</ModalHeader>
					<ModalBody>
						<Input
							label='Amount'
							value={String((editRecord || newRecord)?.amount || 0)} // Convert number to string
							onChange={(e) => {
								const value = e.target.value;
								if (editRecord) {
									setEditRecord({
										...editRecord,
										amount: parseFloat(value) || 0,
									}); // Convert string to number
								} else {
									setNewRecord({
										...newRecord,
										amount: parseFloat(value) || 0,
									}); // Convert string to number
								}
							}}
						/>

						<Input
							label='Description'
							value={(editRecord || newRecord)?.description || ""}
							onChange={(e) => {
								const value = e.target.value;
								if (editRecord) {
									setEditRecord({ ...editRecord, description: value });
								} else {
									setNewRecord({ ...newRecord, description: value });
								}
							}}
						/>
						<Dropdown>
							<DropdownTrigger>
								<Button>
									{(editRecord?.expense_type || newRecord.expense_type) ??
										"Select Type"}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label='Select Type'
								onAction={(key) => {
									if (editRecord) {
										setEditRecord((prev) => {
											if (!prev) return null;
											return { ...prev, expense_type: key as string };
										});
									} else {
										setNewRecord((prev) => ({
											...prev,
											expense_type: key as string,
										}));
									}
								}}
							>
								{expenseTypes.map((type) => (
									<DropdownItem key={type}>{type}</DropdownItem>
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

export default ExpensesTable;
