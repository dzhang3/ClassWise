import "./App.css";
import "./styles/course-details.css";
import "./styles/header.css";
import "./styles/searchbar.css";
import "./styles/components.css";
import { Routes, Route } from "react-router-dom";
import {
	LandingPage,
	SearchPage,
	ClassPage,
	LoginPage,
	RegisterPage,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

// import { Provider } from "react-redux";
// import store from "./store";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/class" element={<ClassPage />} />
					<Route path="/class/:id" element={<ClassPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</AuthProvider>
			{/* </Provider> */}
		</div>
	);
}

export default App;
