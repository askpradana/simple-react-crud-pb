import "./App.css";
import EditPage from "./pages/editpage/EditPage";
import HomePage from "./pages/homepage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" Component={HomePage} />
					<Route path="/edit" Component={EditPage} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
