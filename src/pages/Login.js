import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");


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
			navigate("/");
		}

		dispatch(reset())

	}, [isError, message, navigate, user, dispatch]);

	function handleSubmit(e) {
		e.preventDefault();
		const userData = {
			email,
			password,
		}; 
		
		dispatch(login(userData));

		setEmail("");
		setPassword("");
	}

	return (
		<div className="form-container">
			<h1>Sign in</h1>
			<form onSubmit={handleSubmit}>
				<div className="text-center">
					Not registered yet?{" "}
					<span className="link-primary">
						<Link to="/register">Sign Up</Link>
					</span>
				</div>
				<div className="form-input">
					<label htmlFor="email">Email</label>
					<input required
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="password">Password</label>
					<input required
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<button className="btn btn-block">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
