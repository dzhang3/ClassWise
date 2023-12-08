import Prerequisites from "./Prerequisites";
import Restrictions from "./Restrictions";
import Averages from "./Sections";
import Notes from "./Notes";

export default function CourseDetailsOverview() {
	return (
		<div className="class-details">
			<div className="class-info-half">
				<div className="class-details__description">
					Selected topics in machine learning and data mining,
					including clustering, neural networks, support vector
					machines, decision trees. Methods include feature selection
					and dimensionality reduction, error estimation and empirical
					validation, algorithm design and parallelization, and
					handling of large data sets. Emphasis on good methods and
					practices for deployment of real systems.
				</div>
				<Averages />
			</div>
			<div className="class-info-half">
				<Prerequisites />
				<Restrictions />
				<Notes />
			</div>
		</div>
	);
}
