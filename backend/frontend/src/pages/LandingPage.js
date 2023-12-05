import TitleHeader from "../components/navigation/title-header";
import SearchableDropdown from "../components/SearchableDropDown";
import Button from "@mui/material/Button";

import React, { useState } from "react";

const data = [
	{ id: 1, name: "Dog" },
	{ id: 2, name: "Cat" },
	{ id: 3, name: "Mouse" },
	{ id: 4, name: "Horse" },
	{ id: 5, name: "Cow" },
	{ id: 6, name: "Sheep" },
	{ id: 7, name: "Pig" },
];

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

			<div style={{ display: "flex", justifyContent: "center" }}>
				<SearchableDropdown
					options={data}
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
