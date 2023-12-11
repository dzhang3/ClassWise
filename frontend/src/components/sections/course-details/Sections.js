function Averages({ courseAverages }) {
	return (
		<div className="sections">
			<h4>Class Averages</h4>
			<table className="averages-table">
				<thead>
					<tr>
						<th>Semester</th>
						<th>Grade</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(courseAverages).map((term) => {
						return (
							<tr>
								<td>{term}</td>
								<td>{courseAverages[term]}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Averages;
