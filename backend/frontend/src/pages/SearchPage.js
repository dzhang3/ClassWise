import TitleHeader from "../components/navigation/title-header.js";
import SearchableDropdown from "../components/SearchableDropDown.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { courses } from "../data/course-codes.js";

function SearchPage() {
	const [value, setValue] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		// Find the selected course ID
		if (value !== "") {
			const selectedCourseId = courses.find(
				(course) => course.name === value
			);

			navigate("/class/" + selectedCourseId.id);
		}
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
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<SearchableDropdown
					options={Object.values(courses)}
					label="name"
					id="id"
					selectedVal={value}
					handleChange={(val) => setValue(val)}
				/>
			</div>

			<div style={{ marginTop: "20px" }}>
				<Button variant="contained" onClick={handleClick}>
					Search
				</Button>
			</div>
		</div>
	);
}

export default SearchPage;
