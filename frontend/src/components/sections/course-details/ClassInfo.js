import CourseDetailsOverview from "./course-details-overview";
import CourseTitleDetails from "./course-title-details";
import InstructorInfo from "../InstructorInfo/InstructorInfo";
import CourseReviews from "../course-reviews/CourseReviews";

function ClassInfo() {
	return (
		<div className="class-info">
			<CourseTitleDetails />
			<CourseDetailsOverview />
			<InstructorInfo />
			<CourseReviews />
		</div>
	);
}

export default ClassInfo;
