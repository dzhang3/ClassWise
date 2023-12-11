import axios from "axios";

const API_URL = "http://localhost:8000";

export const GetCourseData = async (courseId) => {
	try {
		console.log(`${API_URL}/courses/${courseId}/`);
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.get(`${API_URL}/courses/${courseId}/`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		return response.data;
	} catch (err) {
		alert("Error retrieving course data");
		console.log(err);
	}
};

export const getInstructorInfo = async (instructorId) => {
	const response = await axios.get(`${API_URL}/instructors/${instructorId}`);
	return response.data;
};
