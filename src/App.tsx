import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import { NextUIProvider } from "@nextui-org/system";
import Dashboard from "./pages/dashboard/layout";
import DashboardMain from "./pages/dashboard";
import ProtectedRoute from "./components/base/ProtectedRoute";
import MeetupVerify from "./components/base/MeetupVerify";
import Users from "./pages/dashboard/pages/Users";
import Tiers from "./pages/dashboard/pages/Tiers";
import Settings from "./pages/dashboard/pages/Settings";
import ExpensesTable from "./pages/dashboard/pages/Expenses";
import ProfitsTable from "./pages/dashboard/pages/Revenues";
import BartersLocations from "./pages/dashboard/pages/BartersLocations";
import BartersList from "./pages/dashboard/pages/Barters";
function App() {
	return (
		<NextUIProvider>
			<Routes>
				<Route
					path='/'
					element={<Auth />}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				>
					<Route
						index
						element={<DashboardMain />}
					/>
					<Route
						path='barterers'
						element={<Users />}
					/>
					<Route
						path='brokers'
						element={<Users isBroker={true} />}
					/>
					<Route
						path='barters'
						element={<BartersList />}
					/>
					<Route
						path='barters-locations'
						element={<BartersLocations />}
					/>
					<Route
						path='tiers'
						element={<Tiers />}
					/>
					<Route
						path='revenues'
						element={<ProfitsTable />}
					/>
					<Route
						path='expenses'
						element={<ExpensesTable />}
					/>
					<Route
						path='settings'
						element={<Settings />}
					/>
				</Route>
				<Route
					path='/meetup-verify/:email?'
					element={<MeetupVerify />}
				/>
			</Routes>
		</NextUIProvider>
	);
}

export default App;
