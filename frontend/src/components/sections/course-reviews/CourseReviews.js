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
		if (!courseId) return;
		getReviews(courseId.split(" ").join("")).then((apiReviews) => {
			let userId = user.user_id;
			let allReviews = apiReviews?.map((review) => ({
				id: review.id,
				isMine: review.comment_user === userId,
				professor: review.comment_instructor,
				date: review.comment_date?.split("T")[0],
				rating: review.comment_rating,
				grade: review.comment_grade,
				comment: review.comment_text,
			}));
			const userHasReview = allReviews?.some((review) => review.isMine);
			setHaveReview(userHasReview);

			setReviews(allReviews); // Set allReviews
		});
	}, [courseId, user.user_id]); // Added user.user_id as a dependency

	useEffect(() => {
		// console.log("Reviews updated in parent:", reviews);
	}, [reviews]);

	return (
		<div className="course-reviews">
			<h3>Reviews</h3>
			<CreateReview
				courseId={courseId}
				haveReview={haveReview}
				reviews={reviews}
				setReviews={setReviews}
				setHaveReview={setHaveReview}
			/>
			<div className="reviews">
				{reviews &&
					reviews.map((review) =>
						!review.isMine ? (
							<Review
								id={review.id} // key added
								name={review.professor}
								date={review.date}
								rating={review.rating}
								grade={review.grade}
								comment={review.comment}
								reviews={reviews}
							/>
						) : !isEditing ? (
							<MyReview
								id={review.id} // key added
								setIsEditing={setIsEditing}
								name={review.professor}
								date={review.date}
								rating={review.rating}
								grade={review.grade}
								comment={review.comment}
								reviews={reviews}
							/>
						) : (
							<EditReview
								id={review.id} // key added
								setIsEditing={setIsEditing}
								name={review.professor}
								date={review.date}
								rating={review.rating}
								grade={review.grade}
								comment={review.comment}
								setReviews={setReviews}
								reviews={reviews}
								review={review}
								haveReview={haveReview}
								setHaveReview={setHaveReview}
							/>
						)
					)}
			</div>
		</div>
	);
}
