import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
	const { user } = useContext(AuthContext);

	return user ? <Outlet /> : <Navigate to="/login" />;
	// <Route {...rest}>{user ? children : <Navigate to="/login" />}</Route>
}
