import { useState } from "react";
import "./LoginPage.css";

function FormLogin({ formData, handleInputChange, handleSubmit }) {
	return (
		<div className="body-form-outer">
			<p>Login</p>
			<form onSubmit={handleSubmit} className="body-form-inner">
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					placeholder="Email"
					onChange={handleInputChange}
					required
				/>
				<hr className="single-line" />
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
					required
				/>
				<br />
				<div className="btn-form-submit">
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
}

function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("https://reqres.in/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				window.location.href = "/home";
			} else {
				console.error("Post request failed: ", response);
			}
		} catch (error) {
			console.error("Error occured: ", error);
		}
	};

	return (
		<div className="body-login-page">
			<div className="body-login-page-outer">
				<div className="body-login-page-inner">
					<div className="body-login-left">
						<FormLogin
							formData={formData}
							handleInputChange={handleInputChange}
							handleSubmit={handleSubmit}
						/>
					</div>
					<div className="body-login-right">
						<img
							src="https://images.unsplash.com/photo-1694501898288-b2819e5b02e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60"
							alt="login img"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
