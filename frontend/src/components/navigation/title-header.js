import React from "react";
import { useNavigate } from "react-router-dom";

export default function TitleHeader() {
	const navigate = useNavigate();

	const handleClasswiseClick = () => {
		// Navigate to the '/' page
		navigate("/");
	};

	const handleLoginClick = () => {
		// Navigate to the '/login' page
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

			<button
				className="universal-button"
				onClick={handleLoginClick}
				style={{ cursor: "pointer" }}
			>
				Login
			</button>
		</div>
	);
}
