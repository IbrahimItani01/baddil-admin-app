import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import { NextUIProvider } from "@nextui-org/system";
import Dashboard from "./pages/dashboard/layout";
import DashboardMain from "./pages/dashboard";
import ProtectedRoute from "./components/base/ProtectedRoute";
import MeetupVerify from "./components/base/MeetupVerify";
import Users from "./pages/dashboard/pages/Users";
import Barters from "./pages/dashboard/pages/Barters";
import Tiers from "./pages/dashboard/pages/Tiers";
import Finances from "./pages/dashboard/pages/Finances";
import Settings from "./pages/dashboard/pages/Settings";
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
						element={<Barters />}
					/>
					<Route
						path='barters-locations'
						element={<Barters withLocations={true} />}
					/>
					<Route
						path='tiers'
						element={<Tiers />}
					/>
					<Route
						path='revenues'
						element={<Finances />}
					/>
					<Route
						path='expenses'
						element={<Finances forExpenses={true} />}
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
