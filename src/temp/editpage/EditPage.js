import { useState } from "react";
import "./EditPage.css";

function EditPage() {
	const initFormData = { name: "", job: "" };

	const [formData, setFormData] = useState(initFormData);
	const [updatedAtString, setUpdatedAtString] = useState("");

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
	return (
		<div className="body-edit-page">
			<div className="body-edit-page-wrapper">
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
							<label>Job</label>
							<input
								type="text"
								name="job"
								placeholder="Edit Job"
								value={formData.job}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-btn">
							<button type="submit">Submit</button>
						</div>
					</div>
				</form>
				{updatedAtString ? <p>Updated at : {updatedAtString}</p> : ""}
			</div>
		</div>
	);
}
export default EditPage;
