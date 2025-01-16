import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";

const Dashboard = () => {
  return (
    <>
      <SideNavBar />
      <Outlet /> 
    </>
  );
};

export default Dashboard;
