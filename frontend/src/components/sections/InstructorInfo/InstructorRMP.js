import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function InstructorRMP({
	name,
	rating,
	difficulty,
	wouldTakeAgain,
	link,
}) {
	const handleClick = () => {
		if (link) {
			window.open(link);
		}
	};
	const handleClick2 = (newLink) => {
		if (newLink) {
			window.open(newLink);
		}
	};

	return link ? (
		<div className="instructor-rmp">
			<div className="instructor-rmp__header">
				<div className="text">
					<div className="stats">{difficulty}&nbsp;</div>
					difficulty |&nbsp;
					<div className="stats">{wouldTakeAgain}&nbsp;</div>
					would take again
				</div>
				<Button
					variant="outlined"
					endIcon={<ChevronRightIcon />}
					onClick={handleClick}
					style={{ height: "40px" }}
				>
					RATE MY PROFESSOR
				</Button>
			</div>

			<div className="instructor-name">{name}</div>
			<Rating
				name="read-only"
				value={rating}
				readOnly
				style={{
					marginBottom: "10px",
				}}
			/>
		</div>
	) : (
		<div className="instructor-rmp">
			<div className="instructor-rmp__header">
				<div className="text">No Rate My Professor found.</div>
				<Button
					variant="outlined"
					endIcon={<ChevronRightIcon />}
					onClick={() =>
						handleClick2(
							"https://www.ratemyprofessors.com/search/professors/1439?q=" +
								name
						)
					}
					style={{ height: "40px" }}
				>
					SEARCH RATE MY PROFESSOR
				</Button>
			</div>
			<div className="instructor-name">{name}</div>
		</div>
	);
}
