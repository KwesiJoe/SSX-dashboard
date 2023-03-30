import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";

function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user, isLoading, isError, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (user) {
			navigate("/login");
		}

		dispatch(reset())

	}, [isError, message, navigate, user]);

	function handleSubmit(e) {
		e.preventDefault();
		const userData = {
			firstName,
			lastName,
			email,
			password,
		};

		if (!firstName || !lastName || !email || !password || !password2) {
			toast.error("Field Required");
		}  
		if (password !== password2) {
			toast.error("Password do not match");
		} 

		dispatch(register(userData));

		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	}

	return (
		<div className="form-container">
			<h1>Create an account</h1>
			<form onSubmit={handleSubmit}>
				<div className="text-center">
					Already registered?{" "}
					<span className="link-primary">
						<Link to="/login">Sign In</Link>
					</span>
				</div>
				<div className="form-input">
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						id="first_name"
						name="first_name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="last_name">Last Name</label>
					<input
						type="text"
						id="last_name"
						name="last_name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="Password"
						id="confirmPassword"
						name="confirmPassword"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<button className="btn btn-block">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Register;
