import { useEffect, useState } from "react";
import "./HomePage.css";
import SingleUserList from "./UserList";

const baseUrlImg = "http://127.0.0.1:8090/api/files/list_user/"; // + USER ID + FILENAME
const baseUrlJson = "http://127.0.0.1:8090/api/collections/list_user/records";

function HomePage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleteSuccess, setDeleteSuccess] = useState(false);

	const fetchData = () => {
		fetch(baseUrlJson)
			.then((resp) => resp.json())
			.then((data) => {
				setUsers(data.items);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fecth data: ", error);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = (user) => {
		fetch(`${baseUrlJson}/${user.id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					console.log(
						"Success delete user with ID: " +
							user.id +
							", with response status: ",
						response.status
					);
					setDeleteSuccess(true);
					fetchData();

					setTimeout(() => {
						setDeleteSuccess(false);
					}, 2000);
				}
			})
			.catch((error) => {
				console.error("error delete user: ", error);
			});
	};

	if (loading) {
		return <p>Loading...</p>;
	} else {
		return (
			<div className="body">
				<div className="body-wrapper-outer">
					<div className="body-wrapper-inner">
						<h1>List Users</h1>
						{loading ? (
							<p>Loading ...</p>
						) : users.length > 0 ? (
							<ul>
								{users.map((user) => (
									<SingleUserList
										key={user.id}
										user={user}
										onDelete={handleDelete}
										baseUrlImg={baseUrlImg}
									/>
								))}
							</ul>
						) : (
							<p>No User found</p>
						)}

						{deleteSuccess && (
							<div className="alert alert-success" role="alert">
								User deleted successfully.
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default HomePage;
