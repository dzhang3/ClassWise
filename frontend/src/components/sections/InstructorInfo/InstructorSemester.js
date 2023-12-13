import InstructorRMP from "./InstructorRMP";
import { useState, useEffect } from "react";
import { getInstructorInfo } from "../../../services";

export default function InstructorSemester({ semester, profs }) {
	const [professors, setProfessors] = useState([]);
	useEffect(() => {
		// Create an array of promises
		const promises = profs.map((prof) => getInstructorInfo(prof));

		// Wait for all promises to resolve
		Promise.all(promises).then((profsData) => {
			setProfessors(profsData);
		});
	}, []);

	return (
		<div className="instructor-semester">
			<h4>{semester ? semester : null}</h4>
			{semester &&
				professors.length > 0 &&
				professors.map((prof) => (
					<InstructorRMP
						name={prof.instructor_name}
						rating={prof.instructor_rating}
						difficulty={prof.level_of_difficulty}
						wouldTakeAgain={prof.would_take_again}
						link={prof.link}
					/>
				))}
		</div>
	);
}
