import InstructorSemester from "./InstructorSemester";
export default function InstructorInfo() {
	return (
		<div className="instructor-info">
			<h3>Instructor(s)</h3>
			<div className="instructors">
				<InstructorSemester />
				<InstructorSemester />
			</div>
		</div>
	);
}
