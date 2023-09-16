import { useEffect, useState } from "react";
import "./HomePage.css";

function SingleUserList({ user, onDelete }) {
	return (
		<li className="user-list" key={user.id}>
			<div className="user-list-single">
				<div className="circle-avatar">
					<img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
				</div>

				<div className="list-propeties">
					<p>
						{user.first_name} {user.last_name} ID: {user.id}
					</p>

					<p className="text-email">{user.email}</p>
				</div>
			</div>

			<div className="btn-delete">
				<button onClick={() => onDelete(user)}>Delete</button>
			</div>
		</li>
	);
}

function HomePage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://reqres.in/api/users?page=2")
			.then((resp) => resp.json())
			.then((data) => {
				setUsers(data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fecth data: ", error);
				setLoading(false);
			});
	}, []);

	const handleDelete = (user) => {
		fetch(`https://reqres.in/api/users/${user.id}`, {
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
									/>
								))}
							</ul>
						) : (
							<p>No User found</p>
						)}
					</div>
				</div>

				<br />

				<div className="body-wrapper-outer">
					<div className="body-wrapper-inner">
						<h1>Go to edit page</h1>
						<div className="btn-edit-page">
							<button onClick={() => (window.location.href = "/edit")}>
								Edit Page
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default HomePage;
