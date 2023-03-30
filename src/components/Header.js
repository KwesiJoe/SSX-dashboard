import React from "react";
import { NavLink, Navigate, Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";


function Header() {
	const dispatch = useDispatch()
	const onLogout = ()=>{
		dispatch(logout())
		dispatch(reset())
	}

	return (
		<div className="navbar">
			<div className="navbar-links">
				<NavLink to="/requests">
					<span>My Requests</span>
				</NavLink>
				<NavLink to="/bankaccounts">
					<span>My Bank Accounts</span>
				</NavLink>
				<NavLink to="/wallet">
					<span>My Wallet</span>
				</NavLink>
				<NavLink to="/provider">
					<span>Providers</span>
				</NavLink>
				<NavLink to="/offers">
					<span>offers</span>
				</NavLink>
				<Link to="/login">
					<button className="btn btn-outline" onClick={onLogout}>Logout</button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
