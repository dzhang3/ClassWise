import InstructorSemester from "./InstructorSemester";

export default function InstructorInfo({ courseTerms }) {
	// Check if courseTerms is not null/undefined and has keys
	const hasCourseTerms = courseTerms && Object.keys(courseTerms).length > 0;

	return (
		<div className="instructor-info">
			<h3>Instructor(s)</h3>
			<div className="instructors">
				{hasCourseTerms ? (
					Object.keys(courseTerms).map((semester) => (
						<InstructorSemester
							key={semester} // Assuming semester is unique and can be used as a key
							semester={semester}
							profs={courseTerms[semester]}
						/>
					))
				) : (
					<div>No instructor information available</div>
				)}
			</div>
		</div>
	);
}
