import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BankAccounts from "./pages/BankAccounts";
import RequestView from "./features/dashboard/RequestView";
import Wallet from "./pages/Wallet";
import Provider from "./pages/Provider";
import Offer from "./pages/Offer";


function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="bankaccounts" element={<BankAccounts />} />
				<Route path="requests" element={<RequestView />} />
				<Route path="wallet" element={<Wallet />} />
				<Route path="provider" element={<Provider />} />
				<Route path="offers" element={<Offer />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
