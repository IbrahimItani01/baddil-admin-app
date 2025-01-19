import BartersOverview from "../../components/base/dashboard/overview/BartersOverview";
import LocationsOverview from "../../components/base/dashboard/overview/LocationsOverview";
import UsersOverview from "../../components/base/dashboard/overview/UsersOverview";

const DashboardMain = () => {
	return (
		<div className='flex flex-wrap gap-5 mx-5'>
			<UsersOverview />
			<BartersOverview />
			<LocationsOverview />
		</div>
	);
};

export default DashboardMain;
