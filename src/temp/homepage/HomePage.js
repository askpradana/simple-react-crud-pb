import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://reqres.in/api/users?page=2")
			.then((resp) => resp.json())
			.then((data) => {
				setData(data);
				setLoading(false);
				// console.log(data);
			})
			.catch((error) => {
				console.error("Error fecth data: ", error);
				setLoading(false);
			});
	}, []);

	const handleDelete = ({ userid }) => {
		fetch(`https://reqres.in/api/users/${userid}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					console.log(
						"Success delete user with ID: " +
							userid +
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
						{data && data.data ? (
							data.data.map((item) => (
								<li className="user-list" key={item.id}>
									<div className="user-list-single">
										<div className="circle-avatar">
											<img src={item.avatar} alt="Avatar of reqres img" />
										</div>
										<div className="list-propeties">
											<p>
												{item.first_name} {item.last_name} {item.id}
											</p>
											<p className="text-email">{item.email}</p>
										</div>
									</div>

									<div>
										<button onClick={() => handleDelete({ userid: item.id })}>
											Delete
										</button>
									</div>
								</li>
							))
						) : (
							<p>data not available</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default HomePage;
