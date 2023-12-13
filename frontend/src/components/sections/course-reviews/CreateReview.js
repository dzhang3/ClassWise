import Rating from "@mui/material/Rating";
import { useState } from "react";
import { TextField } from "@mui/material";
import { postReview } from "../../../services";

export default function CreateReview({
	courseId,
	haveReview,
	setHaveReview,
	setReviews,
	reviews,
}) {
	const [rating, setRating] = useState(0);
	const [professor, setProfessor] = useState("");
	const [comment, setComment] = useState("");
	const [grade, setGrade] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!haveReview) {
			courseId = courseId.split(" ").join("");
			const review = {
				comment_text: comment,
				comment_course: courseId,
				comment_instructor: professor,
				comment_rating: rating,
				comment_grade: grade,
			};
			postReview(courseId, review).then(window.location.reload());
			// setReviews([review, ...reviews]);
			// window.location.reload();
		} else {
			e.preventDefault();
			alert("You already have a review for this course.");
		}
	};

	return (
		<div className="create-review">
			<h3>Create Review</h3>

			<form className="create-review-form" onSubmit={handleSubmit}>
				<div className="create-review__half">
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
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<button className="universal-button" type="submit">
							Post
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
