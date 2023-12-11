import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

function Prerequisites({ coursePrereqs, courseCoreqs }) {
	const navigate = useNavigate();
	const handleChipClick = (label) => {
		// Find the selected course ID
		if (label !== "") {
			const path = `/class/${label.split(" ").join("")}`;
			window.location.href = window.location.origin + path;
		}
	};
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
				{coursePrereqs ? (
					coursePrereqs.map((prereq) => {
						return prereq ? (
							<Chip
								label={prereq}
								onClick={() => handleChipClick(prereq)}
							/>
						) : (
							<></>
						);
					})
				) : (
					<></>
				)}
			</div>
			{courseCoreqs?.length > 0 ? (
				<div>
					<h4
						style={{
							marginTop: "0px",
						}}
					>
						Corequisite(s)
					</h4>
					<div className="chip-container">
						{courseCoreqs ? (
							courseCoreqs.map((coreq) => {
								return coreq ? (
									<Chip
										label={coreq}
										onClick={() => handleChipClick(coreq)}
									/>
								) : (
									<></>
								);
							})
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Prerequisites;
