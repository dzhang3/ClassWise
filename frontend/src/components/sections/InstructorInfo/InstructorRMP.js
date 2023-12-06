import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function InstructorRMP() {
	return (
		<div className="instructor-rmp">
			<div className="instructor-rmp__header">
				<div className="text">
					<div className="stats">3.9&nbsp;</div>Difficulty |&nbsp;
					<div className="stats">100%&nbsp;</div>
					would take again
				</div>
				<Button
					variant="outlined"
					endIcon={<ChevronRightIcon />}
					style={{ height: "40px" }}
				>
					RATE MY PROFESSOR
				</Button>
			</div>

			<div className="instructor-name">Reihannah Rabbany</div>
			<Rating
				name="read-only"
				value={4}
				readOnly
				style={{
					marginBottom: "10px",
				}}
			/>
			<div className="chip-container">
				<Chip label="Easy" />
				<Chip label="Easy" />
				<Chip label="Easy" />
				<Chip label="Easy" />
				<Chip label="Easy" />
			</div>
		</div>
	);
}
