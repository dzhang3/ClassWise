import "../styles/course-details.css";
import TitleHeader from "../components/navigation/title-header";
import ClassHeader from "../components/navigation/class-header";
import ClassInfo from "../components/sections/course-details/ClassInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetCourseData } from "../services";

function ClassPage() {
	const [courseData, setCourseData] = useState({});
	const { id } = useParams();
	useEffect(() => {
		const courseData = GetCourseData(id);
		courseData.then((data) => {
			setCourseData(data);
		});
	}, []);
	return (
		<div className="ClassPage">
			<TitleHeader />
			<ClassHeader />
			<ClassInfo courseData={courseData} />
		</div>
	);
}

export default ClassPage;
