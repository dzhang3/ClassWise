import Review from "./Review";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import MyReview from "./MyReview";

export default function CourseReviews() {
	return (
		<div className="course-reviews">
			<h3>Reviews</h3>
			<CreateReview />
			<div className="reviews">
				<Review />
				<Review />
				<Review />
				<MyReview />
			</div>
			<EditReview />
		</div>
	);
}
