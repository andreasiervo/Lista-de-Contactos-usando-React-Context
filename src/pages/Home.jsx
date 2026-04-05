import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadContacts();
	}, []);

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-end mb-4">
				<Link to="/add-contact">
					<button className="btn btn-success">Nuevo contacto</button>
				</Link>
			</div>

			{store.contacts.length > 0 ? (
				store.contacts.map((contact) => (
					<ContactCard key={contact.id} contact={contact} />
				))
			) : (
				<div className="text-center mt-5">
					<h5>No hay contactos</h5>
				</div>
			)}
		</div>
	);
};

export default Home;