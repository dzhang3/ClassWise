import RegisterComponent from "../components/LoginRegistration/RegisterComponent";
import TitleHeader from "../components/navigation/title-header";

function RegisterPage() {
	return (
		<div
			className="LoginPage"
			style={{ alignContent: "center", width: "100%" }}
		>
			<TitleHeader />
			<RegisterComponent />
		</div>
	);
}

export default RegisterPage;
