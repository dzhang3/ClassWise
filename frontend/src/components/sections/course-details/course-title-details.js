import Chip from "@mui/material/Chip";

export default function CourseTitleDetails() {
	return (
		<section className="course-title-details" style={{ display: "flex" }}>
			<div className="course-title-details-left">
				<div className="top-text">COMP 551 | 3 CREDITS</div>
				<div className="middle-text">Applied Machine Learning</div>
				<div className="chip-container">
					<Chip label="COMP 551" />
				</div>
			</div>
		</section>
	);
}
