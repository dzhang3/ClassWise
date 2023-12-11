import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const backendUrl = process.env.baackend_url || "http://localhost:8000";

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwtDecode(localStorage.getItem("authTokens"))
			: null
	);
	const [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);

	const createUser = async (userData) => {
		const response = await fetch(`${backendUrl}/auth/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userData.email,
				first_name: userData.first_name,
				last_name: userData.last_name,
				password: userData.password,
				re_password: userData.re_password,
			}),
		});
		const data = await response.json();
		if (response.status === 201) {
			navigate("/login");
		} else {
			let error = "";
			for (let key in data) {
				for (let err in data[key]) {
					error += `${key} : ${data[key][err]}\n`;
				}
			}
			alert(error);
		}
	};

	const loginUser = async (userData) => {
		const response = await fetch(`${backendUrl}/auth/jwt/create/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userData.email,
				password: userData.password,
			}),
		});
		const data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwtDecode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/search");
		} else {
			console.log(response);
			console.log(data);
			alert("Invalid login");
		}
	};

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/login");
	};

	const updateToken = async () => {
		console.log("Updating token");
		let response = await fetch(`${backendUrl}/auth/jwt/refresh`, {
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
			console.log(data);
			setAuthTokens((prevAuthTokens) => ({
				...prevAuthTokens,
				access: data.access,
			}));
			console.log(authTokens);
			setUser(jwtDecode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(authTokens));
		} else {
			logout();
		}
	};

	useEffect(() => {
		let timer = 1000 * 60 * 210;
		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, timer);
		return () => clearInterval(interval);
	}, [authTokens]);

	const contextData = {
		user: user,
		setUser: setUser,
		createUser: createUser,
		loginUser: loginUser,
		logout: logout,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	);
};
