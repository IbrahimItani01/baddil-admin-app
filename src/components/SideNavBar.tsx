import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Logo from "../assets/with-title/logo-no-background.png";
import {
	ChartArea,
	Landmark,
	LayoutDashboard,
	Settings,
	Users,
} from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { Link } from "react-router";

const SideNavBar = () => {
	return (
		<Sidebar className='dark:bg-black bg-white h-full'>
			<div className='flex mt-5 flex-col items-center justify-center gap-3'>
				<img
					className='mx-auto'
					width={150}
					src={Logo}
					alt='Admin Dashboard Logo'
				/>
				<h1 className='font-bold text-lg'>Admin Dashboard</h1>
			</div>
			<Divider className='my-5' />
			<Menu>
				<MenuItem
					component={<Link to={"/dashboard"} />}
					icon={<LayoutDashboard />}
				>
					Overview
				</MenuItem>

				<SubMenu
					icon={<Users />}
					label='Users'
				>
					<MenuItem component={<Link to={"/dashboard/barterers"} />}>
						Barterers
					</MenuItem>
					<MenuItem component={<Link to={"/dashboard/brokers"} />}>
						Brokers
					</MenuItem>
				</SubMenu>

				<SubMenu
					icon={<ChartArea />}
					label='Insights'
				>
					<MenuItem component={<Link to={"/dashboard/barters"} />}>
						Barters
					</MenuItem>
					<MenuItem component={<Link to={"/dashboard/barters-locations"} />}>
						Barter Locations
					</MenuItem>
					<MenuItem component={<Link to={"/dashboard/tiers"} />}>
						Tiers
					</MenuItem>
				</SubMenu>

				<SubMenu
					icon={<Landmark />}
					label='Finances'
				>
					<MenuItem component={<Link to={"/dashboard/revenues"} />}>
						Revenues
					</MenuItem>
					<MenuItem component={<Link to={"/dashboard/expenses"} />}>
						Expenses
					</MenuItem>
				</SubMenu>

				<MenuItem
					component={<Link to={"/dashboard/settings"} />}
					icon={<Settings />}
				>
					Settings
				</MenuItem>
			</Menu>
		</Sidebar>
	);
};

export default SideNavBar;
