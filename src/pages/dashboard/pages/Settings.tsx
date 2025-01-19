import React, { useState } from "react";
import {
	Button,
	Input,
	Avatar,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import { Edit, Lock } from "lucide-react";

const Settings = () => {
	const [username, setUsername] = useState("");
	const [avatarUrl, setAvatarUrl] = useState(
		"/placeholder.svg?height=100&width=100"
	);
	const [isEditing, setIsEditing] = useState(false);
	const deleteModal = useDisclosure();
	const passwordModal = useDisclosure();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-2xl font-bold mb-6'>Account Settings</h1>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				<div className='flex items-center space-x-4'>
					<Avatar
						src={avatarUrl}
						size='lg'
					/>
					<Input
						type='file'
						accept='image/*'
						onChange={handleAvatarChange}
						className='max-w-xs'
						disabled={!isEditing}
					/>
					<Button
						endContent={<Edit />}
						onPress={() => setIsEditing(!isEditing)}
						color='primary'
					>
						{isEditing ? "Save Changes" : "Edit"}
					</Button>
				</div>

				<Input
					label='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='max-w-xs'
					disabled={!isEditing}
				/>

				<div className='flex items-center space-x-4'>
					<Button
						endContent={<Lock />}
						onPress={passwordModal.onOpen}
						color='primary'
						disabled={!isEditing}
					>
						Change Password
					</Button>
				</div>

				<div className='flex space-x-4'>
					<Button
						color='primary'
						type='submit'
						disabled={!isEditing}
					>
						Save Changes
					</Button>
					<Button
						color='danger'
						onPress={deleteModal.onOpen}
					>
						Delete Account
					</Button>
				</div>
			</form>

			{/* Password change alert modal */}
			<Modal
				isOpen={passwordModal.isOpen}
				onOpenChange={passwordModal.onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Password Change</ModalHeader>
							<ModalBody>
								<p>Change password functionality is not implemented yet.</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									onPress={onClose}
								>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>

			{/* Account deletion confirmation modal */}
			<Modal
				isOpen={deleteModal.isOpen}
				onOpenChange={deleteModal.onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Delete Account</ModalHeader>
							<ModalBody>
								<p>
									Are you sure you want to delete your account? This action
									cannot be undone.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='default'
									onPress={onClose}
								>
									Cancel
								</Button>
								<Button
									color='primary'
									onPress={() => {
										onClose();
									}}
								>
									Confirm
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Settings;
