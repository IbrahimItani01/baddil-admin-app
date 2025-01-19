import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import Header from "../../components/base/dashboard/Header";

const Dashboard = () => {
	return (
		<>
			<div className='flex h-[100vh]'>
				<SideNavBar />
				<div className='w-full'>
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
