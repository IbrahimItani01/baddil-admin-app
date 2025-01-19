import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
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

const mockData = {
	barterer: [
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			user_type: { name: "Barterer" },
			user_status: { status: "Active" },
			subscription: { plan: "Basic", expires_at: "2025-02-10T00:00:00Z" },
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			user_type: { name: "Barterer" },
			user_status: { status: "Suspended" },
			subscription: { plan: "Premium", expires_at: "2025-03-15T00:00:00Z" },
		},
	],
	broker: [
		{
			id: "3",
			name: "Alice Johnson",
			email: "alice@example.com",
			user_type: { name: "Broker" },
			user_status: { status: "Active" },
			subscription: { plan: "Gold", expires_at: "2025-04-20T00:00:00Z" },
		},
	],
};

interface Props {
	isBroker?: boolean;
}

const Users = ({ isBroker = false }: Props) => {
	const [users, setUsers] = useState([]);
	const [editUser, setEditUser] = useState<unknown | null>(null); // Track user to edit
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
	const userType = isBroker ? "broker" : "barterer";

	useEffect(() => {
		const loadUsers = () => {
			const result = mockData;
			const filteredUsers = result[userType] || [];
			setUsers(filteredUsers);
		};
		loadUsers();
	}, [userType]);

	const handleDelete = (id: string) => {
		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
	};

	const handleEdit = (user: unknown) => {
		setEditUser(user); // Set user to be edited
		setIsModalOpen(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditUser({ ...editUser, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user.id === editUser.id ? editUser : user))
		);
		setIsModalOpen(false);
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
					<TableColumn>Subscription Plan</TableColumn>
					<TableColumn>Expires At</TableColumn>
					<TableColumn>Actions</TableColumn>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.user_type.name}</TableCell>
							<TableCell>{user.user_status.status}</TableCell>
							<TableCell>{user.subscription.plan}</TableCell>
							<TableCell>
								{new Date(user.subscription.expires_at).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Edit
										className='cursor-pointer text-blue-500'
										onClick={() => handleEdit(user)}
									/>
									<Trash2
										className='cursor-pointer text-red-500'
										onClick={() => handleDelete(user.id)}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{editUser && (
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<ModalContent>
						<ModalHeader>Edit User</ModalHeader>
						<ModalBody>
							<Input
								label='Name'
								name='name'
								value={editUser.name}
								onChange={handleInputChange}
							/>
							<Input
								label='Email'
								name='email'
								value={editUser.email}
								onChange={handleInputChange}
							/>
							<Input
								label='Subscription Plan'
								name='subscription'
								value={editUser.subscription.plan}
								onChange={(e) =>
									setEditUser({
										...editUser,
										subscription: {
											...editUser.subscription,
											plan: e.target.value,
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
							<Button onPress={handleSave}>Save</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</div>
	);
};

export default Users;
