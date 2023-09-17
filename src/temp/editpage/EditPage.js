import { useState } from "react";
import "./EditPage.css";
import { useLocation } from "react-router-dom";

function FormEditPage({ handleSubmit, initialFormData }) {
	const [formData, setFormData] = useState(initialFormData);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-wrapper">
				<div className="form-single">
					<label>Name</label>
					<input
						type="text"
						name="name"
						placeholder="Edit Name"
						value={formData.name}
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
						value={formData.age}
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
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-btn">
					<button type="submit">Submit</button>
				</div>
			</div>
		</form>
	);
}

function EditPage() {
	const [updatedAtString, setUpdatedAtString] = useState("");
	const propsParam = useLocation();
	const user = propsParam.state?.user;

	const initialFormData = {
		name: user?.name || "",
		age: user?.age || "",
		email: user?.email || "",
	};

	const handleSubmit = async (event, formData) => {
		event.preventDefault();
		try {
			const response = await fetch("https://reqres.in/api/users/2", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				const resp = await response.json();
				const updatedAt = new Date(resp.updatedAt);
				const updatedAtString = updatedAt.toLocaleString();
				setUpdatedAtString(updatedAtString);
				console.log(resp);
			} else {
				console.error("PUT Request failed: ", response);
			}
		} catch (error) {
			console.error("Error occured: ", error);
		}
	};

	if (!user) {
		return <p>User not found.</p>;
	}

	return (
		<div className="body-edit-page">
			<div className="body-edit-page-wrapper">
				<FormEditPage
					handleSubmit={handleSubmit}
					initialFormData={initialFormData}
				/>
				{updatedAtString ? (
					<p>PUT Method success | Updated at : {updatedAtString}</p>
				) : (
					""
				)}
			</div>
		</div>
	);
}
export default EditPage;
