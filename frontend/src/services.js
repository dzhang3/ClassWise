import axios from "axios";

export const GetCourseData = async (courseId) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.get(`/courses/${courseId}/`, {
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
			`/instructors/${instructorName.toString()}/`,
			{
				headers: {
					Authorization: `Bearer ${authTokens.access}`,
				},
			}
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const getReviews = async (courseId) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.get(`/comments/${courseId}/`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const postReview = async (courseId, review) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.post(`/comments/${courseId}/`, review, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteReview = async (reviewId) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.delete(`/editcomments/${reviewId}/`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const editReview = async (reviewId, review) => {
	try {
		const authTokens = JSON.parse(localStorage.getItem("authTokens"));
		const response = await axios.put(`/editcomments/${reviewId}/`, review, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log(err);
	}
};
