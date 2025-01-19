import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

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
import {
	addExpense,
	deleteExpense,
	editExpense,
	Expense,
	ExpenseType,
} from "../../../../store/slices/expenses.slice";
import { useAppSelector } from "../../../../store/store";

const expenseTypes = ["salary", "broker_compensation", "office_supplies"];

const ExpensesTable = () => {
	const dispatch = useDispatch();
	const expensesData = useAppSelector((state) => state.expenses.expensesData);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editRecord, setEditRecord] = useState<Expense | null>(null);
	const [newRecord, setNewRecord] = useState<Expense>({
		id: "",
		created_at: new Date(),
		updated_at: new Date(),
		amount: 0,
		description: "",
		expense_type: "salary" as ExpenseType,
		date: new Date(),
	});

	const handleAddRecord = () => {
		setNewRecord({
			id: "",
			created_at: new Date(),
			updated_at: new Date(),
			amount: 0,
			description: "",
			expense_type: "salary" as ExpenseType,
			date: new Date(),
		});
		setIsModalOpen(true);
	};

	const handleEditRecord = (record: Expense) => {
		setEditRecord(record);
		setIsModalOpen(true);
	};

	const handleDeleteRecord = (id: string) => {
		dispatch(deleteExpense(id));
	};

	const handleSaveRecord = () => {
		if (editRecord) {
			dispatch(editExpense({ id: editRecord.id, updatedExpense: editRecord }));
		} else {
			const newId = Date.now().toString();
			dispatch(
				addExpense({
					...newRecord,
					id: newId,
					created_at: new Date(),
					updated_at: new Date(),
				})
			);
		}
		setEditRecord(null);
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
			<div className='overflow-hidden '>
				<Table>
					<TableHeader>
						<TableColumn>Amount</TableColumn>
						<TableColumn>Description</TableColumn>
						<TableColumn>Type</TableColumn>
						<TableColumn>Date</TableColumn>
						<TableColumn>Actions</TableColumn>
					</TableHeader>
					<TableBody>
						{expensesData.map((record: Expense) => (
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
			</div>
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
							value={String((editRecord || newRecord).amount)}
							onChange={(e) =>
								(editRecord ? setEditRecord : setNewRecord)({
									...((editRecord || newRecord) as Expense),
									amount: parseFloat(e.target.value) || 0,
								})
							}
						/>
						<Input
							label='Description'
							value={(editRecord || newRecord).description}
							onChange={(e) =>
								(editRecord ? setEditRecord : setNewRecord)({
									...((editRecord || newRecord) as Expense),
									description: e.target.value,
								})
							}
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
								onAction={(key) =>
									(editRecord ? setEditRecord : setNewRecord)({
										...((editRecord || newRecord) as Expense),
										expense_type: key as ExpenseType,
									})
								}
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
