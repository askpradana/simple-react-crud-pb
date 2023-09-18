import { useState } from "react";
import "./Adduser.css";

const baseUrl = "http://127.0.0.1:8090";

function AddUserPage({ fetchData }) {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		email: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleAddNewUser = async (event) => {
		event.preventDefault();

		if (formData.name.length > 2) {
			try {
				const response = await fetch(
					`${baseUrl}/api/collections/list_user/records`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					}
				);
				if (response.ok) {
					console.log(response.body);
					fetchData();
				} else {
					console.error("Post request failed: ", response);
				}
			} catch (error) {
				console.error("Error occured: ", error);
			}
		} else {
			console.log("name must have at least 3 characters");
		}
	};

	return (
		<div>
			<h1>Add New User</h1>
			<form onSubmit={(event) => handleAddNewUser(event)}>
				<div className="form-wrapper">
					<div className="form-single">
						<label>Name</label>
						<input
							type="text"
							name="name"
							placeholder="Edit Name"
							// value={formData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-single">
						<label>Age</label>
						<input
							type="text"
							name="age"
							placeholder="Edit Age"
							// value={formData.age}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-single">
						<label>Email</label>
						<input
							type="text"
							name="email"
							placeholder="Edit email"
							// value={formData.email}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-btn">
						<button type="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddUserPage;
