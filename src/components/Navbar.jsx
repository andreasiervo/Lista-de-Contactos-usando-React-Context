import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light px-4">
			<Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
				Contact List
			</Link>
		</nav>
	);
};

export default Navbar;