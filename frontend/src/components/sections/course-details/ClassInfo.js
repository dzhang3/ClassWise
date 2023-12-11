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
	const [coursePrereqs, setCoursePrereqs] = useState([]);
	const [courseCoreqs, setCourseCoreqs] = useState([]);
	const [courseRestrictions, setCourseRestrictions] = useState("");

	useEffect(() => {
		if (courseData) {
			setCourseDescription(courseData.course_description);
			setCourseName(courseData.course_name);

			const termRegex = /(\b(Fall|Winter|Spring|Summer)\s+\d{4}\b)/g;
			const matches = courseData.course_offering_terms?.match(termRegex);
			setCourseTerms(matches || []);

			if (
				typeof courseData.course_previous_grades === "string" &&
				courseData.course_previous_grades !== "[]"
			) {
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
			setCourseCredits(courseData.course_credit);

			setCourseId(
				courseData.course_code?.slice(0, 4) +
					" " +
					courseData.course_code?.slice(4)
			);

			if (
				typeof courseData.course_prerequisites === "string" &&
				courseData.course_prerequisites !== "[]"
			) {
				const prereqList = courseData.course_prerequisites
					.slice(2, -2)
					.split("', '");
				setCoursePrereqs(prereqList || []);
			}

			if (
				typeof courseData.course_corequisites === "string" &&
				courseData.course_corequisites !== "[]"
			) {
				const coreqList = courseData.course_corequisites
					.slice(2, -2)
					.split("', '");
				setCourseCoreqs(coreqList || []);
			}

			setCourseRestrictions(courseData.course_restrictions);
		}
	}, [courseData]); // Dependency array with courseData

	console.log(courseCoreqs);

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
				coursePrereqs={coursePrereqs}
				courseCoreqs={courseCoreqs}
				courseRestrictions={courseRestrictions}
			/>
			<InstructorInfo />
			<CourseReviews />
		</div>
	);
}

export default ClassInfo;
