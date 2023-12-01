import '../styles/course-details.css';
import TitleHeader from '../components/navigation/title-header';
import ClassHeader from '../components/navigation/class-header';
import CourseTitleDetails from '../components/sections/course-details/course-title-details';
import CourseDetailsOverview from '../components/sections/course-details/course-details-overview';

function ClassPage() {
    return (
        <div className="ClassPage">
            <TitleHeader />
            <ClassHeader />
            <CourseTitleDetails />
            <CourseDetailsOverview />
        </div>
    );
}

export default ClassPage;