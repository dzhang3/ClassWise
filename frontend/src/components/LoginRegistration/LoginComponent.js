import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate(); // Use useNavigate hook

	async function handleSubmit(e) {
		e.preventDefault(); // Prevent the default form submission behavior

		try {
			// Perform your login logic here
			// If login is successful, navigate to the desired route
			navigate("/search");
		} catch (err) {
			setError("Failed to log in");
		}
	}

	return (
		<div
			className="login-component-wrapper"
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				paddingTop: "10vh",
			}}
		>
			<div className="login-component">
				<div className="login-component-title">Login</div>

				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						gap: "40px",
						textAlign: "left",
					}}
				>
					<TextField
						variant="standard"
						type="username"
						label="Username"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>

					<div
						className="login-component-password"
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<TextField
							variant="standard"
							type="password"
							label="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					<button className="login-component-button" type="submit">
						<div className=".login-component-button-text">
							Login
						</div>
					</button>

					<div className="login-component-signup">
						Don't have an account?{" "}
						<a href="/register" className="register-text">
							Create an account here.
						</a>
					</div>
				</form>
				{error && <p>{error}</p>}
			</div>
		</div>
	);
}

export default LoginComponent;
