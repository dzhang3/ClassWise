import Chip from "@mui/material/Chip";

function Prerequisites({ coursePrereqs, courseCoreqs }) {
	console.log(courseCoreqs);
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
						return prereq ? <Chip label={prereq} /> : <></>;
					})
				) : (
					<></>
				)}
			</div>
			{courseCoreqs.length > 0 ? (
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
								return coreq ? <Chip label={coreq} /> : <></>;
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
