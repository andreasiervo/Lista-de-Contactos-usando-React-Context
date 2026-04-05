const API_URL = "https://playground.4geeks.com/contact/agendas";
const AGENDA_SLUG = "andie-contact-list";

export const initialStore = () => {
	return {
		contacts: [],
		agendaSlug: AGENDA_SLUG
	};
};

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "set_contacts":
			return {
				...store,
				contacts: action.payload
			};

		default:
			return store;
	}
}

export const actions = ({ getStore, setStore }) => ({
	createAgenda: async () => {
		try {
			const response = await fetch(`${API_URL}/${getStore().agendaSlug}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				console.log("La agenda ya existe o no se pudo crear");
			}
		} catch (error) {
			console.log("Error creando agenda:", error);
		}
	},

	getContacts: async () => {
		try {
			const response = await fetch(`${API_URL}/${getStore().agendaSlug}/contacts`);
			const data = await response.json();

			const contactsArray = data.contacts || data || [];
			setStore({ contacts: contactsArray });
		} catch (error) {
			console.log("Error cargando contactos:", error);
		}
	},

	loadContacts: async () => {
		await actions({ getStore, setStore }).getContacts();
	},

	createContact: async (contactData) => {
		try {
			const payload = {
				name: contactData.name,
				phone: contactData.phone,
				email: contactData.email,
				address: contactData.address,
				agenda_slug: getStore().agendaSlug
			};

			const response = await fetch(`${API_URL}/${getStore().agendaSlug}/contacts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				await actions({ getStore, setStore }).getContacts();
				return true;
			} else {
				const errorData = await response.json();
				console.log("Error creando contacto:", errorData);
				return false;
			}
		} catch (error) {
			console.log("Error creando contacto:", error);
			return false;
		}
	},

	updateContact: async (id, contactData) => {
		try {
			const payload = {
				name: contactData.name,
				phone: contactData.phone,
				email: contactData.email,
				address: contactData.address,
				agenda_slug: getStore().agendaSlug
			};

			const response = await fetch(`${API_URL}/${getStore().agendaSlug}/contacts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				await actions({ getStore, setStore }).getContacts();
				return true;
			} else {
				const errorData = await response.json();
				console.log("Error actualizando contacto:", errorData);
				return false;
			}
		} catch (error) {
			console.log("Error actualizando contacto:", error);
			return false;
		}
	},

	deleteContact: async (id) => {
		try {
			const response = await fetch(`${API_URL}/${getStore().agendaSlug}/contacts/${id}`, {
				method: "DELETE"
			});

			if (response.ok) {
				await actions({ getStore, setStore }).getContacts();
				return true;
			} else {
				const errorData = await response.json();
				console.log("Error eliminando contacto:", errorData);
				return false;
			}
		} catch (error) {
			console.log("Error eliminando contacto:", error);
			return false;
		}
	}
});