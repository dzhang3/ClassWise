import Review from "./Review";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import MyReview from "./MyReview";
import { useState } from "react";

export default function CourseReviews() {
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div className="course-reviews">
			<h3>Reviews</h3>
			<CreateReview />
			<div className="reviews">
				<Review />
				<Review />
				<Review />

				{!isEditing ? (
					<MyReview setIsEditing={setIsEditing} />
				) : (
					<EditReview setIsEditing={setIsEditing} />
				)}
			</div>
		</div>
	);
}
