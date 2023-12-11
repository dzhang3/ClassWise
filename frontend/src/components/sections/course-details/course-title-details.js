import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function CourseTitleDetails({
	courseId,
	courseName,
	courseCredits,
}) {
	return (
		<section className="course-title-details" style={{ display: "flex" }}>
			<div className="course-title-details-left">
				{courseId && courseCredits ? (
					<div className="top-text">
						{courseId} | {courseCredits} CREDITS
					</div>
				) : null}
				<div className="middle-text">{courseName}</div>
				<div className="chip-container">
					<Chip label={courseId} />
				</div>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* <Button variant="contained" style={{ height: "40px" }}>
					Add to Schedule +
				</Button> */}
			</div>
		</section>
	);
}
