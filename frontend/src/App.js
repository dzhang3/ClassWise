import "./App.css";
import "./styles/course-details.css";
import "./styles/header.css";
import "./styles/searchbar.css";
import "./styles/components.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage, ClassPage, LoginPage, RegisterPage } from "./pages";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/class" element={<ClassPage />} />
				<Route path="/class/:id" element={<ClassPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
