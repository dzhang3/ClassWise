import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

function LoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate(); // Use useNavigate hook

	const { user, loginUser } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			navigate("/search");
		}
	}, [user]);

	function handleSubmit(e) {
		e.preventDefault();

		const userData = {
			email: email,
			password: password,
		};

		loginUser(userData);
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
