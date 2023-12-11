import CourseDetailsOverview from "./course-details-overview";
import CourseTitleDetails from "./course-title-details";
import InstructorInfo from "../InstructorInfo/InstructorInfo";
import CourseReviews from "../course-reviews/CourseReviews";
import CourseNames from "../../../data/course_codes.json";
import { useEffect, useState } from "react";

function ClassInfo({ courseData }) {
	const [courseDescription, setCourseDescription] = useState("");
	const [courseName, setCourseName] = useState("");
	const [courseTerms, setCourseTerms] = useState([]);
	const [courseAverages, setCourseAverages] = useState({});
	const [courseCredits, setCourseCredits] = useState(0);
	const [courseId, setCourseId] = useState("");

	useEffect(() => {
		if (courseData) {
			setCourseDescription(courseData.course_description);
			setCourseName(courseData.course_name);

			const termRegex = /(\b(Fall|Winter|Spring|Summer)\s+\d{4}\b)/g;
			const matches = courseData.course_offering_terms?.match(termRegex);
			setCourseTerms(matches || []);

			if (typeof courseData.course_previous_grades === "string") {
				const gradeList = courseData.course_previous_grades
					.slice(2, -2)
					.split("', '");

				const gradeDict = {};
				if (Array.isArray(gradeList) && gradeList.length > 0) {
					for (const grade of gradeList) {
						const [term, avg] = grade.split(":");
						gradeDict[term] = avg.trim();
					}
					setCourseAverages(gradeDict);
				} else {
					setCourseAverages({});
				}
			}

			const creditsRegex = /\((\d+) credits\)|(\d+) credits/;
			setCourseCredits(
				CourseNames[courseData.course_code]?.match(creditsRegex)[1] ||
					CourseNames[courseData.course_code]?.match(
						creditsRegex
					)[2] ||
					null
			);

			setCourseId(
				courseData.course_code?.slice(0, 4) +
					" " +
					courseData.course_code?.slice(4)
			);
		}
	}, [courseData]); // Dependency array with courseData

	console.log(courseAverages);

	// Optionally, render conditionally based on the existence of courseData
	if (!courseData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="class-info">
			<CourseTitleDetails
				courseName={courseName}
				courseCredits={courseCredits}
				courseId={courseId}
			/>
			<CourseDetailsOverview
				courseDescription={courseDescription}
				courseAverages={courseAverages}
			/>
			<InstructorInfo />
			<CourseReviews />
		</div>
	);
}

export default ClassInfo;
