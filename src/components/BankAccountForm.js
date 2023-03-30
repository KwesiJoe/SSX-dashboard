import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccounts } from "../features/dashboard/accountSlice";

function BankAccountForm() {

	const [identifier, setIdentifier] = useState("");
	const [bankName, setBankName] = useState("");
	const [accountName, setAccountName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user, isLoading, isError, message } = useSelector(
		(state) => state.auth
	);

	function handleSubmit(e) {
		e.preventDefault();
		const bankAccountData = {
			identifier,
			bankName,
			accountName,
			accountNumber
		}

		dispatch(createBankAccounts(bankAccountData));

		setIdentifier("");
		setBankName("");
		setAccountName("");
		setAccountNumber("");
	}

	return (
		<div className="form-container">
			<h1>Account</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<label htmlFor="identifier">Identifier</label>
					<input required
						type="text"
						id="identifier"
						name="identifier"
						value={identifier}
						onChange={(e) => setIdentifier(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="bank">Bank</label>
					<input required
						type="text"
						id="bank"
						name="bank"
						value={bankName}
						onChange={(e) => setBankName(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="accountName">Account Name</label>
					<input required
						type="text"
						id="accountName"
						name="accountName"
						value={accountName}
						onChange={(e) => setAccountName(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="accountNumber">Account Number</label>
					<input required
						type="text"
						id="accountNumber"
						name="accountNumber"
						value={accountNumber}
						onChange={(e) => setAccountNumber(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<button className="btn btn-block">Add</button>
				</div>
			</form>
		</div>
	);
}

export default BankAccountForm;