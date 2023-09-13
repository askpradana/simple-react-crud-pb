import { useState } from "react";

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
				// const data = await response.json();
				// console.log("POST request Success, response: ", data);
				window.location.href = "/home";
			} else {
				console.error("Post request failed: ", response);
			}
		} catch (error) {
			console.error("Error occured: ", error);
		}
	};

	return (
		<div>
			<p>Login</p>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					placeholder="Email"
					onChange={handleInputChange}
					required
				/>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
					placeholder="Password"
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default LoginPage;
