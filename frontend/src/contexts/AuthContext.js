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

	const loginUser = async (e) => {
		e.preventDefault();
		// TODO fix url
		const response = await fetch("http://localhost:5000/auth/users", {
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
