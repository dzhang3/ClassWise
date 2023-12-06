import TitleHeader from "../components/navigation/title-header";
import SearchableDropdown from "../components/SearchableDropDown";
import Button from "@mui/material/Button";

import React, { useState } from "react";
import { courses } from "../data/course-codes.js";

function LandingPage() {
	const [value, setValue] = useState("");
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
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<SearchableDropdown
					options={courses}
					label="name"
					id="id"
					selectedVal={value}
					handleChange={(val) => setValue(val)}
				/>
			</div>

			<div style={{ marginTop: "20px" }}>
				<Button variant="contained">Search</Button>
			</div>
		</div>
	);
}

export default LandingPage;
