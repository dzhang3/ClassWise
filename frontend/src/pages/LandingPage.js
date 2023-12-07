import TitleHeader from "../components/navigation/title-header.js";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

function SearchPage() {
	const [value, setValue] = useState("");
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
			<div style={{ marginTop: "20px" }}>
				<Button variant="contained" onClick={handleLoginClick}>
					Click Here to Login
				</Button>
			</div>
		</div>
	);
}

export default SearchPage;
