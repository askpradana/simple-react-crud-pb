import "./App.css";
import EditPage from "./temp/editpage/EditPage";
import HomePage from "./temp/homepage/HomePage";
import LoginPage from "./temp/loginpage/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" Component={LoginPage} />
					<Route path="/home" Component={HomePage} />
					<Route path="/edit" Component={EditPage} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
