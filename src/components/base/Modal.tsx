import { ModalContent, ModalHeader, ModalBody, Modal } from "@nextui-org/react";
import { X } from "lucide-react";

interface CustomModalProps {
	header: string;
	body: string;
	isOpen: boolean | undefined;
	onOpenChange: ((isOpen: boolean) => void) | undefined;
}

const CustomModal = ({
	header,
	body,
	isOpen,
	onOpenChange,
}: CustomModalProps) => {
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'
				className='fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-6 bg-white'
				closeButton={<X></X>}
			>
				<ModalContent className='shadow-lg border border-red-300 rounded-md flex flex-col gap-5'>
					<ModalHeader className='flex flex-col gap-1 text-red-700 font-semibold mx-auto'>
						{header}
					</ModalHeader>
					<ModalBody>
						<p className=' mx-auto text-sm text-red-600'>{body}</p>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CustomModal;
