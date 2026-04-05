import React, { useReducer, createContext, useContext } from "react";
import storeReducer, { initialStore, actions } from "../store";

export const Context = createContext(null);

export function StoreProvider({ children }) {
	const [store, dispatch] = useReducer(storeReducer, initialStore());

	const setStore = (updatedStore) => {
		dispatch({
			type: "set_contacts",
			payload: updatedStore.contacts
		});
	};

	const getStore = () => store;

	return (
		<Context.Provider value={{ store, actions: actions({ getStore, setStore }) }}>
			{children}
		</Context.Provider>
	);
}

export default function useGlobalReducer() {
	return useContext(Context);
}