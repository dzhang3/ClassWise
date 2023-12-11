import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function CourseTitleDetails({
	courseId,
	courseName,
	courseCredits,
	courseLink,
}) {
	const handleClick = () => {
		// Find the selected course ID
		if (courseId !== "") {
			window.open(courseLink);
		}
	};
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
				<Button
					variant="contained"
					onClick={handleClick}
					style={{ height: "40px" }}
				>
					More Info
				</Button>
			</div>
		</section>
	);
}
