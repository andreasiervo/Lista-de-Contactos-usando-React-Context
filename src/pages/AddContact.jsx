import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";

const AddContact = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

	useEffect(() => {
		if (id && store.contacts.length > 0) {
			const contactToEdit = store.contacts.find((contact) => String(contact.id) === String(id));

			if (contactToEdit) {
				setFormData({
					name: contactToEdit.name || "",
					email: contactToEdit.email || "",
					phone: contactToEdit.phone || "",
					address: contactToEdit.address || ""
				});
			}
		}
	}, [id, store.contacts]);

	useEffect(() => {
		if (id && store.contacts.length === 0) {
			actions.loadContacts();
		}
	}, [id]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let success = false;

		if (id) {
			success = await actions.updateContact(id, formData);
		} else {
			success = await actions.createContact(formData);
		}

		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="container mt-4">
			<h1 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h1>

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Full Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder="Full Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						placeholder="Enter email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Phone</label>
					<input
						type="text"
						className="form-control"
						name="phone"
						placeholder="Enter phone"
						value={formData.phone}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Address</label>
					<input
						type="text"
						className="form-control"
						name="address"
						placeholder="Enter address"
						value={formData.address}
						onChange={handleChange}
						required
					/>
				</div>

				<button type="submit" className="btn btn-primary w-100">
					save
				</button>

				<div className="mt-3">
					<Link to="/">or get back to contacts</Link>
				</div>
			</form>
		</div>
	);
};

export default AddContact;