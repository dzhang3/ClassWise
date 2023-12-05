import LoginComponent from "../components/LoginRegistration/LoginComponent";
import TitleHeader from "../components/navigation/title-header";

function LoginPage() {
	return (
		<div className="LoginPage" style={{ alignContent: "center" }}>
			<TitleHeader />
			<LoginComponent />
		</div>
	);
}

export default LoginPage;
