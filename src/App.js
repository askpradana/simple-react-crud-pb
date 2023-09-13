import "./App.css";
import HomePage from "./temp/homepage/HomePage";
import LoginPage from "./temp/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" Component={LoginPage} />
					<Route path="/home" Component={HomePage} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
