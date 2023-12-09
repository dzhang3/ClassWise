import TitleHeader from "../components/navigation/title-header.js";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

function SearchPage() {
	const navigate = useNavigate(); // Create a navigate object

	const handleLoginClick = () => {
		// Navigate to /login when the button is clicked
		navigate("/login");
	};

	return (
		<div className="LandingPage">
			<TitleHeader />
			<div style={{ textAlign: "center", marginTop: "15vh" }}>
				<h1
					style={{
						fontSize: "3rem",
						fontWeight: "bold",
						color: "#0759a1",
					}}
				>
					ClassWise
				</h1>
				<p> Class search made easy!</p>
			</div>{" "}
			<div style={{ marginTop: "40px", marginBottom: "20px" }}>
				<Button variant="contained" onClick={handleLoginClick}>
					Click Here to Login
				</Button>
			</div>
			<div className="login-component-signup">
				Don't have an account?{" "}
				<a href="/register" className="register-text">
					Create an account here.
				</a>
			</div>
		</div>
	);
}

export default SearchPage;
