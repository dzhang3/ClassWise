import Chip from "@mui/material/Chip";

function Prerequisites() {
	return (
		<div className="course-details__prerequisites">
			<h4
				style={{
					marginTop: "0px",
				}}
			>
				Prerequisite(s)
			</h4>
			<div className="chip-container">
				<Chip label="MATH 323" />
				<Chip label="ECSE 205" />
				<Chip label="MATH 133" />
				<Chip label="MATH 222" />
				<Chip label="COMP 202" />
			</div>
		</div>
	);
}

export default Prerequisites;
