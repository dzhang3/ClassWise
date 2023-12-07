import InstructorSemester from "./InstructorSemester";
export default function InstructorInfo() {
	const semesters = [
		{
			name: "Fall 2020",
			profs: [
				{
					name: "Reihaneh Rabbany",
					rating: 4.8,
					difficulty: 3.2,
					wouldTakeAgain: "90%",
					tags: ["knowledgeable", "engaging", "approachable"],
				},
				{
					name: "Isabeau Prémont-Schwarz",
					rating: 3.6,
					difficulty: 2.7,
					wouldTakeAgain: "80%",
					tags: ["experienced", "helpful", "organized"],
				},
			],
		},
		{
			name: "Spring 2020",
			profs: [
				{
					name: "Isabeau Prémont-Schwarz",
					rating: 3.6,
					difficulty: 2.7,
					wouldTakeAgain: "80%",
					tags: ["experienced", "helpful", "organized"],
				},
			],
		},
	];

	return (
		<div className="instructor-info">
			<h3>Instructor(s)</h3>
			<div className="instructors">
				{semesters.map((semester) => (
					<InstructorSemester semester={semester} />
				))}
			</div>
		</div>
	);
}
