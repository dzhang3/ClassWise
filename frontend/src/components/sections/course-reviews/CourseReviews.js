import React, { useState, useEffect, useContext } from "react";
import Review from "./Review";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import MyReview from "./MyReview";
import { getReviews } from "../../../services";
import AuthContext from "../../../contexts/AuthContext";

export default function CourseReviews({ courseId }) {
	const [isEditing, setIsEditing] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [haveReview, setHaveReview] = useState(false);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getReviews(courseId.split(" ").join("")).then((apiReviews) => {
			if (!Array.isArray(apiReviews)) {
				console.error(
					"Expected apiReviews to be an array, got:",
					typeof apiReviews
				);
				return; // Exit if apiReviews is not an array
			}

			let userId = user.user_id;
			console.log("apiReviews is", typeof apiReviews, apiReviews); // Fixed the typo in console.log
			let allReviews = apiReviews?.map((review) => ({
				id: review.id,
				isMine: review.comment_user === userId,
				professor: review.comment_instructor,
				date: review.comment_date?.split("T")[0],
				rating: review.comment_rating,
				grade: review.comment_grade,
				comment: review.comment_text,
			}));
			const userHasReview = allReviews.some((review) => review.isMine);
			setHaveReview(userHasReview);

			setReviews(allReviews); // Set allReviews
		});
	}, [courseId, user.user_id]); // Dependencies
	console.log(reviews);
	return (
		<div className="course-reviews">
			<h3>Reviews</h3>
			<CreateReview courseId={courseId} haveReview={haveReview} />
			<div className="reviews">
				{reviews.map((review) =>
					!review.isMine ? (
						<Review
							id={review.id} // Correctly placed key
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
						/>
					) : !isEditing ? (
						<MyReview
							id={review.id} // Correctly placed key
							setIsEditing={setIsEditing}
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
						/>
					) : (
						<EditReview
							id={review.id} // Correctly placed key
							setIsEditing={setIsEditing}
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
							setReviews={setReviews}
							reviews={reviews}
						/>
					)
				)}
			</div>
		</div>
	);
}
