import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkUserByEmail } from "../../../apis/routes/user/user.routes";
import { CheckCircle, AlertCircle } from "lucide-react"; // Importing icons from Lucide
import { formatDate } from "../../../lib/utils/general.utils";
const MeetupVerify = () => {
	const { email } = useParams();
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		createdAt: "",
		userStatus: "",
	});
	const [noData, setNoData] = useState(true);

	useEffect(() => {
		const getUserData = async () => {
			if (email) {
				try {
					const response = await checkUserByEmail(email);
					if (response?.data) {
						setUserData({
							name: response.data.name || "",
							email: response.data.email || "",
							createdAt: formatDate(response.data.created_at) || "",
							userStatus: response.data.user_status_id || "",
						});
						setNoData(false);
					}
				} catch (error) {
					console.error("Failed to fetch user data:", error);
				}
			}
		};

		getUserData();
	}, [email]);

	return (
		<div className='p-12 flex flex-col gap-12'>
			<h1
				className={`font-raleway-bold text-5xl text-center dark:text-white text-primary`}
			>
				Baddil
			</h1>
			<div className='flex flex-col items-center gap-5'>
				<div className='flex items-center gap-1'>
					{!noData ? (
						<CheckCircle
							className={`text-3xl dark:text-dark-success text-light-success`}
						/>
					) : (
						<AlertCircle className='text-3xl text-primary' />
					)}
					<span className='font-raleway-bold text-2xl'>
						{!noData ? "User Scanned!" : "User not found!"}
					</span>
				</div>
				{!noData && (
					<>
						<div className='flex items-center gap-1'>
							<strong className='font-nunito-sans-bold'>Username:</strong>
							<span className='font-nunito-sans-regular'>{userData.name}</span>
						</div>
						<div className='flex items-center gap-1'>
							<strong className='font-nunito-sans-bold'>Email:</strong>
							<span className='font-nunito-sans-regular'>{userData.email}</span>
						</div>
						<div className='flex items-center gap-1'>
							<strong className='font-nunito-sans-bold'>Active since:</strong>
							<span className='font-nunito-sans-regular'>
								{userData.createdAt}
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MeetupVerify;
