import Chip from "@mui/material/Chip";

function Restrictions() {
	return (
		<div className="course-details__restrictions">
			<h4
				style={{
					marginBottom: "0px",
				}}
			>
				Restriction(s)
			</h4>
			<p>Not open to students who have taken or are taking:</p>
			<div className="chip-container">
				<Chip label="COMP 451" />
				<Chip label="ECSE 551" />
				<Chip label="PSYC 560" />
			</div>
		</div>
	);
}

export default Restrictions;
