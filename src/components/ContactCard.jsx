import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
	const { actions } = useContext(Context);

	const handleDelete = async () => {
		const confirmed = window.confirm("¿Seguro que quieres eliminar este contacto?");
		if (confirmed) {
			await actions.deleteContact(contact.id);
		}
	};

	return (
		<div className="card mb-3 shadow-sm">
			<div className="card-body">
				<div className="row align-items-center">
					<div className="col-md-2 text-center mb-3 mb-md-0">
						<img
							src="https://i.pinimg.com/1200x/72/10/c6/7210c6d49b08bbb7aa1ad18ae5997ed0.jpg"
							alt="contact"
							className="rounded-circle img-fluid"
							style={{ width: "120px", height: "120px", objectFit: "cover" }}
						/>
					</div>

					<div className="col-md-8">
						<h4 className="mb-3">{contact.name}</h4>
						<p className="mb-2">
							<i className="fas fa-map-marker-alt me-2"></i>
							{contact.address}
						</p>
						<p className="mb-2">
							<i className="fas fa-phone me-2"></i>
							{contact.phone}
						</p>
						<p className="mb-0">
							<i className="fas fa-envelope me-2"></i>
							{contact.email}
						</p>
					</div>

					<div className="col-md-2 text-end">
						<Link to={`/edit-contact/${contact.id}`} className="btn btn-light me-2">
							<i className="fas fa-pencil-alt"></i>
						</Link>
						<button className="btn btn-light" onClick={handleDelete}>
							<i className="fas fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;