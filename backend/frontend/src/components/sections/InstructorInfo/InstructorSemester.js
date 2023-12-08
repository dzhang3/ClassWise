import InstructorRMP from "./InstructorRMP";

export default function InstructorSemester({ semester }) {
	return (
		<div className="instructor-semester">
			<h4>{semester ? semester.name : null}</h4>
			{semester
				? semester.profs.map((prof) => (
						<InstructorRMP
							name={prof.name}
							rating={prof.rating}
							difficulty={prof.difficulty}
							wouldTakeAgain={prof.wouldTakeAgain}
							tags={prof.tags}
						/>
				  ))
				: null}
		</div>
	);
}
