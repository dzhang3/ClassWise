import "./App.css";
import "./styles/course-details.css";
import "./styles/header.css";
import "./styles/searchbar.css";
import "./styles/components.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	LandingPage,
	SearchPage,
	ClassPage,
	LoginPage,
	RegisterPage,
} from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

// import { Provider } from "react-redux";
// import store from "./store";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} exact />
					<Route path="/search" element={<PrivateRoute />}>
						<Route path="/search" element={<SearchPage />} />
					</Route>
					<Route path="/class/:id" element={<PrivateRoute />}>
						<Route path="/class/:id" element={<ClassPage />} />
					</Route>
					<Route path="/class" element={<PrivateRoute />}>
						<Route path="/class" element={<ClassPage />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</AuthProvider>
			{/* </Provider> */}
		</div>
	);
}

export default App;
