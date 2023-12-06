import Rating from "@mui/material/Rating";
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export default function EditReview(props) {
	const [rating, setRating] = useState(0);
	const [professor, setProfessor] = useState("");
	const [comment, setComment] = useState("");
	const [grade, setGrade] = useState("");

	const { setIsEditing } = props;

	const handleClick = () => {
		setIsEditing(false);
	};

	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					grey: {
						main: grey[700],
						dark: grey[500],
					},
				},
			})}
		>
			<div className="edit-review">
				<h3>Edit Review</h3>

				<form className="create-review-form">
					<div className="create-review__half">
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
							}}
						>
							<h4
								style={{
									margin: "0px",
									padding: "0px",
								}}
							>
								Rating:
							</h4>
							<Rating
								name="simple-controlled"
								value={rating}
								onChange={(event, newRating) => {
									setRating(newRating);
								}}
								style={{
									width: "120px",
								}}
							/>
						</div>

						<TextField
							label="Comment"
							multiline
							rows={4}
							variant="standard"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							inputProps={{ maxLength: 350 }}
							style={{
								width: "100%",
							}}
						/>
					</div>
					<div className="create-review__half">
						<TextField
							label="Professor"
							variant="standard"
							value={professor}
							onChange={(e) => setProfessor(e.target.value)}
							style={{
								width: "100%",
							}}
						/>
						<TextField
							label="Grade"
							variant="standard"
							value={grade}
							onChange={(e) => setGrade(e.target.value)}
							style={{
								width: "100%",
							}}
						/>
					</div>
				</form>
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "flex-end",
						gap: "10px",
					}}
				>
					<Button
						variant="outlined"
						color="grey"
						onClick={handleClick}
					>
						Cancel
					</Button>
					<Button variant="outlined" color="error">
						Delete
					</Button>
					<Button variant="outlined" color="success">
						Save
					</Button>
				</div>
			</div>
		</ThemeProvider>
	);
}
