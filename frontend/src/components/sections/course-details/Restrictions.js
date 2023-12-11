import Chip from "@mui/material/Chip";

function Restrictions({ courseRestrictions }) {
	return (
		<div className="course-details__restrictions">
			<h4
				style={{
					marginBottom: "0px",
				}}
			>
				Restriction(s)
			</h4>
			<p>{courseRestrictions ? courseRestrictions : "None"}</p>
		</div>
	);
}

export default Restrictions;
