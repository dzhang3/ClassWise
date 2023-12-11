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

export const getInstructorInfo = async (instructorName) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.get(
			`${API_URL}/instructors/${instructorName.toString()}/`,
			{
				headers: {
					Authorization: `Bearer ${authTokens.access}`,
				},
			}
		);
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const getReviews = async (courseId) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.get(`${API_URL}/comments/${courseId}/`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const postReview = async (courseId, review) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.post(
			`${API_URL}/comments/${courseId}/`,
			review,
			{
				headers: {
					Authorization: `Bearer ${authTokens.access}`,
				},
			}
		);
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteReview = async (reviewId) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.delete(
			`${API_URL}/editcomments/${reviewId}/`,
			{
				headers: {
					Authorization: `Bearer ${authTokens.access}`,
				},
			}
		);
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const editReview = async (reviewId, review) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.put(
			`${API_URL}/editcomments/${reviewId}/`,
			review,
			{
				headers: {
					Authorization: `Bearer ${authTokens.access}`,
				},
			}
		);
		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
