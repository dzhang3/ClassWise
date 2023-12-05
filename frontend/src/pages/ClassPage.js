import "../styles/course-details.css";
import TitleHeader from "../components/navigation/title-header";
import ClassHeader from "../components/navigation/class-header";
import ClassInfo from "../components/sections/course-details/ClassInfo";

function ClassPage() {
	return (
		<div className="ClassPage">
			<TitleHeader />
			<ClassHeader />
			<ClassInfo />
		</div>
	);
}

export default ClassPage;
