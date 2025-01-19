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
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";

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
	const [data, setData] = useState(mockExpenses);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editRecord, setEditRecord] = useState<any>(null);
	const [newRecord, setNewRecord] = useState<any>({
		amount: "",
		description: "",
		expense_type: "",
		date: new Date().toISOString().slice(0, 10),
	});

	const handleAddRecord = () => {
		setNewRecord({
			amount: "",
			description: "",
			expense_type: "",
			date: new Date().toISOString().slice(0, 10),
		});
		setIsModalOpen(true);
	};

	const handleEditRecord = (record: any) => {
		setEditRecord(record);
		setIsModalOpen(true);
	};

	const handleDeleteRecord = (id: string) => {
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
			amount: "",
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
							value={(editRecord || newRecord)?.amount || ""}
							onChange={(e) => {
								const value = e.target.value;
								editRecord
									? setEditRecord({ ...editRecord, amount: value })
									: setNewRecord({ ...newRecord, amount: value });
							}}
						/>
						<Input
							label='Description'
							value={(editRecord || newRecord)?.description || ""}
							onChange={(e) => {
								const value = e.target.value;
								editRecord
									? setEditRecord({ ...editRecord, description: value })
									: setNewRecord({ ...newRecord, description: value });
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
										setEditRecord((prev) => ({ ...prev, expense_type: key }));
									} else {
										setNewRecord((prev) => ({ ...prev, expense_type: key }));
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
