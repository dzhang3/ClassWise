import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);

	const history = useHistory();

	const loginUser = async (e) => {
		e.preventDefault();
		// TODO fix url
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});
		const data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			history.push("/search");
		} else {
			alert("something wrong");
		}
	};

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		history.push("/login");
	};

	const updateToken = async () => {
		let response = await fetch("http://localhost:5000/api/auth/refresh", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refresh: authTokens.refresh,
			}),
		});

		if (response.status === 200) {
			const data = await response.json();
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			logout();
		}
	};

	useEffect(() => {
		if (authTokens) {
			const decoded = jwt_decode(authTokens.access);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				updateToken();
			}
		}
	}, [authTokens]);

	const contextData = {
		user: user,
		loginUser: loginUser,
	};

	return <AuthContext.Provider value={""}>{children}</AuthContext.Provider>;
};
