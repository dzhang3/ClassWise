import React, { useState, useEffect } from "react";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [retypePassword, setRetypePassword] = useState("");
	const [error, setError] = useState(null);
	const [samePassword, setSamePassword] = useState(true);
	const typePasswordRef = useRef(null);
	const retypePasswordRef = useRef(null);

	const { user, createUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (password && samePassword) {
			typePasswordRef.current.focus();
		} else if (!samePassword) {
			retypePasswordRef.current.focus();
		}
	}, [samePassword]);

	useEffect(() => {
		if (user) {
			navigate("/search");
		}
	}, [user]);

	useEffect(() => {
		validatePassword();
	}, [password, retypePassword]);

	function validatePassword() {
		if (retypePassword && password !== retypePassword) {
			setSamePassword(false);
		} else {
			setSamePassword(true);
		}
	}

	function retypePasswordChange(e) {
		setRetypePassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!samePassword) {
			alert("Passwords do not match");
			return;
		}

		const userData = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
			re_password: retypePassword,
		};

		createUser(userData);
		// Continue with form submission logic
		console.log("Form submitted");
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
				<div className="login-component-title">Create Account</div>

				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						gap: "30px",
						textAlign: "left",
					}}
				>
					<TextField
						required
						variant="standard"
						label="First Name"
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
					<TextField
						required
						variant="standard"
						label="Last Name"
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
					<TextField
						required
						variant="standard"
						type="email"
						label="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<TextField
						required
						variant="standard"
						type="password"
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					{samePassword && (
						<TextField
							required
							variant="standard"
							type="password"
							label="Retype Password"
							value={retypePassword}
							onChange={(e) => retypePasswordChange(e)}
							inputRef={typePasswordRef}
						/>
					)}

					{!samePassword && (
						<TextField
							error
							required
							variant="standard"
							type="password"
							label="Retype Password"
							value={retypePassword}
							onChange={(e) => retypePasswordChange(e)}
							helperText="Passwords do not match"
							inputRef={retypePasswordRef}
						/>
					)}

					<button className="login-component-button" type="submit">
						<div className=".login-component-button-text">
							Create Account
						</div>
					</button>

					<div className="login-component-signup">
						Already have an account?{" "}
						<a href="/login" className="register-text">
							Login here.
						</a>
					</div>
				</form>
				{error && <p>{error}</p>}
			</div>
		</div>
	);
}

export default RegisterComponent;
