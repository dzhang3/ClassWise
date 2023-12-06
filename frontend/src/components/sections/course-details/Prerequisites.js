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
				<Chip label="COMP 551" />
			</div>
		</div>
	);
}

export default Prerequisites;
