import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function TitleHeader() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	const handleClasswiseClick = () => {
		// Navigate to the '/' page
		navigate("/");
	};

	const handleLoginClick = () => {
		// Navigate to the '/login' page
		navigate("/login");
	};

	const handleLogoutClick = () => {
		// Navigate to the '/login' page
		setUser("");
		navigate("/login");
	};

	return (
		<div className="title-header">
			<h1
				className="title-header-h1-white"
				onClick={handleClasswiseClick}
				style={{ cursor: "pointer" }}
			>
				ClassWise
			</h1>

			{!user ? (
				<button
					className="universal-button"
					onClick={handleLoginClick}
					style={{ cursor: "pointer" }}
				>
					Login
				</button>
			) : (
				<button
					className="universal-button"
					onClick={handleLogoutClick}
					style={{ cursor: "pointer" }}
				>
					Logout
				</button>
			)}
		</div>
	);
}
