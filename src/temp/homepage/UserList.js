import { useNavigate } from "react-router-dom";

function SingleUserList({ user, onDelete, baseUrlImg }) {
	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate("/edit", { state: { user } });
	};

	return (
		<li className="user-list" key={user.id}>
			<div className="user-list-single">
				<div className="circle-avatar">
					<img
						src={`${baseUrlImg}${user.id}/${user.avatar}`}
						alt={`Avatar of ${user.name}`}
					/>
				</div>

				<div className="list-propeties">
					<p>
						{user.name} ID: {user.id}
					</p>

					<p className="text-email">{user.email}</p>
				</div>
			</div>

			<div className="btn-class">
				<div className="btn-edit-delete">
					<button onClick={handleEditClick}>Edit Page</button>
				</div>

				<div className="btn-edit-delete">
					<button onClick={() => onDelete(user)}>Delete</button>
				</div>
			</div>
		</li>
	);
}

export default SingleUserList;
