import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

export default function Review(props) {
	const { setIsEditing } = props;

	const handleClick = () => {
		setIsEditing(true);
	};

	return (
		<div className="review">
			<div className="review-header">
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						gap: "10px",
					}}
				>
					<p
						style={{
							padding: "0px",
							margin: "0px",
						}}
					>
						Professor:
					</p>
					<h4
						style={{
							padding: "0px",
							margin: "0px",
						}}
					>
						Professor name
					</h4>
				</div>

				<h4
					style={{
						padding: "0px",
						margin: "0px",
					}}
				>
					date
				</h4>
			</div>
			<div className="review-body">
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						gap: "10px",
					}}
				>
					<p
						style={{
							padding: "0px",
							margin: "0px",
						}}
					>
						Grade:
					</p>
					<h4
						style={{
							padding: "0px",
							margin: "0px",
						}}
					>
						grade
					</h4>
				</div>
			</div>
			<div className="review-body">
				<Rating name="read-only" value={4} readOnly />
			</div>
			<div className="review-body">
				<p>
					comment comment comment comment comment comment comment
					comment comment comment comment comment comment comment
					comment comment comment comment
				</p>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginTop: "10px",
				}}
			>
				<Button variant="outlined" onClick={handleClick}>
					Edit
				</Button>
			</div>
		</div>
	);
}
