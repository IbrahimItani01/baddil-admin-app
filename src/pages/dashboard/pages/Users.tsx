import { useState } from "react";
import { Edit } from "lucide-react";
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
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { editUser, User } from "../../../../store/slices/users.slice";

interface Props {
	isBroker?: boolean;
}

const Users = ({ isBroker = false }: Props) => {
	const dispatch = useAppDispatch();
	const usersData = useAppSelector((state) => state.users.usersData);
	const [editUserData, setEditUserData] = useState<User | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const userType = isBroker ? "broker" : "barterer";

	const users = usersData[userType] || [];

	const userStatuses = ["active", "flagged", "banned"];

	const handleEdit = (user: User) => {
		setEditUserData(user);
		setIsModalOpen(true);
	};

	const handleStatusChange = (status: string) => {
		if (editUserData) {
			setEditUserData({
				...editUserData,
				user_status: {
					...editUserData.user_status,
					status,
				},
			});
		}
	};

	const handleSave = () => {
		if (editUserData) {
			dispatch(
				editUser({
					userType,
					userId: editUserData.id,
					updatedUser: { user_status: editUserData.user_status },
				})
			);
			setIsModalOpen(false);
		}
	};

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>
				{isBroker ? "Brokers" : "Barterers"} List
			</h1>
			<Table aria-label={`${isBroker ? "Brokers" : "Barterers"} Table`}>
				<TableHeader>
					<TableColumn>Name</TableColumn>
					<TableColumn>Email</TableColumn>
					<TableColumn>User Type</TableColumn>
					<TableColumn>Status</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.user_type.type}</TableCell>
							<TableCell>{user.user_status.status}</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Edit
										className='cursor-pointer text-blue-500'
										onClick={() => handleEdit(user)}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{editUserData && (
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<ModalContent>
						<ModalHeader>Edit User Status</ModalHeader>
						<ModalBody>
							<Dropdown>
								<DropdownTrigger>
									<Button>{editUserData.user_status.status}</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label='Select User Status'
									onAction={(key) => handleStatusChange(key as string)}
								>
									{userStatuses.map((status) => (
										<DropdownItem
											key={status}
											textValue={status}
										>
											{status}
										</DropdownItem>
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
							<Button onPress={handleSave}>Save</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</div>
	);
};

export default Users;
