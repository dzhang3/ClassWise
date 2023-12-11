import Prerequisites from "./Prerequisites";
import Restrictions from "./Restrictions";
import Averages from "./Sections";
import Notes from "./Notes";

export default function CourseDetailsOverview({
	courseDescription,
	courseAverages,
	coursePrereqs,
	courseCoreqs,
	courseRestrictions,
}) {
	return (
		<div className="class-details">
			<div className="class-info-half">
				<div className="class-details__description">
					{courseDescription
						? courseDescription
						: "No description available."}
				</div>
				<Averages courseAverages={courseAverages} />
			</div>
			<div className="class-info-half">
				<Prerequisites
					coursePrereqs={coursePrereqs}
					courseCoreqs={courseCoreqs}
				/>
				<Restrictions courseRestrictions={courseRestrictions} />
			</div>
		</div>
	);
}
