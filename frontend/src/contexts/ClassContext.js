import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000";

const ClassContext = createContext();

export const getCourseData = async (courseId) => {
	try {
		const response = await axios.get(`${API_URL}/courses/${courseId}`);
		return response.data;
	} catch (err) {
		alert("Error retrieving course data");
	}
};

export const getInstructorInfo = async (instructorId) => {
	const response = await axios.get(`${API_URL}/instructors/${instructorId}`);
	return response.data;
};
