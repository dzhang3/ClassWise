import RegisterComponent from "../components/LoginRegistration/RegisterComponent";
import TitleHeader from "../components/navigation/title-header";

function RegisterPage() {
	return (
		<div className="LoginPage" style={{ alignContent: "center" }}>
			<TitleHeader />\
			<RegisterComponent />
		</div>
	);
}

export default RegisterPage;
