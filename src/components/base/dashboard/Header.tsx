import { useAppSelector } from "../../../../store/store";
import { Divider, Image } from "@nextui-org/react";
import { CircleUserRound } from "lucide-react";

const Header = () => {
	const { userName, profilePictureUrl } = useAppSelector((state) => state.user);

	return (
		<div className="flex flex-col w-full pt-2">
			<div className='flex justify-between  items-center h-[5%] px-5'>
				<h1 className='text-2xl font-semibold'>
					Welcome Back, {userName || "Ibrahim"}!
				</h1>
				{profilePictureUrl ? (
					<Image src={profilePictureUrl} />
				) : (
					<CircleUserRound size={30} />
				)}
			</div>
            <Divider/>
		</div>
	);
};

export default Header;
