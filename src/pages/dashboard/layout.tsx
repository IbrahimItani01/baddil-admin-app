import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";

const Dashboard = () => {
  return (
    <div className="flex h-[100vh]">
      <SideNavBar />
      <Outlet /> 
    </div>
  );
};

export default Dashboard;
