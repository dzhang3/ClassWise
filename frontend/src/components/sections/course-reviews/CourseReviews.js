import Review from "./Review";
import CreateReview from "./CreateReview";
import EditReview from "./EditReview";
import MyReview from "./MyReview";
import { useState } from "react";

export default function CourseReviews() {
	const [isEditing, setIsEditing] = useState(false);

	const reviews = [
		{
			isMine: true,
			professor: "Reihaneh Rabbany",
			date: "2021-10-01",
			rating: 4,
			grade: "A",
			comment:
				"Reihaneh Rabbany is an exceptional professor. Her lectures are engaging, and she provides valuable insights. The course material is well-organized, and I thoroughly enjoyed the learning experience.",
		},
		{
			isMine: false,
			professor: "Isabeau Prémont-Schwarz",
			date: "2021-10-02",
			rating: 4.5,
			grade: "A-",
			comment:
				"Isabeau Prémont-Schwarz is an experienced educator who makes complex topics easy to understand. His passion for the subject reflects in his teaching style. I would highly recommend his classes.",
		},
		{
			isMine: false,
			professor: "Reihaneh Rabbany",
			date: "2021-10-03",
			rating: 3.8,
			grade: "B+",
			comment:
				"Reihaneh Rabbany is knowledgeable, but the course workload was a bit challenging. Despite that, her support and guidance were valuable. The class discussions were thought-provoking.",
		},
		{
			isMine: false,
			professor: "Reihaneh Rabbany",
			date: "2021-10-04",
			rating: 4.2,
			grade: "A",
			comment:
				"Reihaneh Rabbany creates an inclusive learning environment. His lectures are well-structured, and he encourages critical thinking. The assignments were relevant and enhanced my understanding of the subject.",
		},
		{
			isMine: false,
			professor: "Isabeau Prémont-Schwarz",
			date: "2021-10-05",
			rating: 3.5,
			grade: "B",
			comment:
				"Isabeau Prémont-Schwarz has a unique teaching style. While her approach might not be suitable for everyone, I appreciated the different perspective it brought to the subject. The course challenged me to think differently.",
		},
	];

	return (
		<div className="course-reviews">
			<h3>Reviews</h3>
			<CreateReview />
			<div className="reviews">
				{reviews.map((review) =>
					!review.isMine ? (
						<Review
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
						/>
					) : !isEditing ? (
						<MyReview
							setIsEditing={setIsEditing}
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
						/>
					) : (
						<EditReview
							setIsEditing={setIsEditing}
							name={review.professor}
							date={review.date}
							rating={review.rating}
							grade={review.grade}
							comment={review.comment}
						/>
					)
				)}
			</div>
		</div>
	);
}
