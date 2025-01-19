import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import { ReactNode } from "react";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const isAuthenticated =
		useAppSelector((state) => state.user.isLoggedIn) ||
		localStorage.getItem("token");

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}
	return <>{children}</>;
};

export default ProtectedRoute;
