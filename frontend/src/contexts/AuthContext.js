import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [authTokens, setAuthTokens] = useState("");
	// const [user1, setUser1] = useState(() =>
	// 	localStorage.getItem("authTokens")
	// 		? jwt_decode(localStorage.getItem("authTokens"))
	// 		: null
	// );
	// const [authTokens, setAuthTokens] = useState(() =>
	// 	localStorage.getItem("authTokens")
	// 		? JSON.parse(localStorage.getItem("authTokens"))
	// 		: null
	// );

	const createUser = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/auth/users/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: e.target.email.value,
				first_name: e.target.first_name.value,
				last_name: e.target.last_name.value,
				password: e.target.password.value,
			}),
		});
	};

	const loginUser = async (e) => {
		e.preventDefault();
		// TODO fix url
		const response = await fetch("http://localhost:5000/auth/jwt/create/", {
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
			setUser(jwtDecode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/search");
		} else {
			alert("something wrong");
		}
	};

	const logout = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/login");
	};

	const updateToken = async () => {
		let response = await fetch("http://localhost:5000/auth/jwt/refresh", {
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
			setUser(jwtDecode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			logout();
		}
	};

	useEffect(() => {
		if (authTokens) {
			const decoded = jwtDecode(authTokens.access);
			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime) {
				updateToken();
			}
		}
	}, [authTokens]);

	const contextData = {
		user: user,
		setUser: setUser,

		// loginUser: loginUser,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	);
};
