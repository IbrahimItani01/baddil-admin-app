import { Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import { NextUIProvider } from "@nextui-org/system";
import Dashboard from "./pages/dashboard/layout";
import DashboardMain from "./pages/dashboard";
import ProtectedRoute from "./components/base/ProtectedRoute";
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
				</Route>
			</Routes>
		</NextUIProvider>
	);
}

export default App;
