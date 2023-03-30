import Header from "../components/Header";
import BankAccountForm from "../components/BankAccountForm";
import { useDispatch, useSelector } from "react-redux";
import { createWallet, getWallets } from "../features/dashboard/walletSlice";
import { useState, useEffect } from "react";


const Wallet = () => {

	const [currency, setCurrency] = useState("");
	const [amount, setAmount] = useState("");

	const [show, setShow] = useState(false); 
	const dispatch = useDispatch();
	const { wallets, isLoading, isError, message } = useSelector(
		(state) => state.wallet
	)
	

	useEffect(() => {
		dispatch(getWallets());
	}, [dispatch]);
	

	const handleShow = () => {
		setShow(prevState=>!prevState)
	}

	function handleSubmit(e) {
		e.preventDefault();

		dispatch(createWallet({
			currency, amount
		}));

		setCurrency("");
		setAmount("")

		handleShow();
	}

	console.log(wallets);

	return (
		<>
			<Header />
			<div className="main-container">
				{isLoading && <h1>Loading...</h1>}
				{!isLoading && isError ? <div>Error:{message}</div> : null}
				<div className="account-header">
					{!show ? (
						<h1>Wallets</h1>
					) : (
						<span onClick={() => setShow(false)} style={{ color: "black" }}>
							back
						</span>
					)}
					<button onClick={handleShow} className="btn btn-primary">
						add Wallet
					</button>
				</div>
				{!show ? (
					<table>
						<thead>
							<tr>
								<th>Currency</th>
								<th>Balance</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{!isLoading && wallets.length
								? wallets?.map((wallet) => (
										<tr key={wallet.id}>
											<td>{wallet.currency}</td>
											<td>{wallet.balance}</td>
											<td>delete</td>
										</tr>
								  ))
								: null}
						</tbody>
					</table>
				) : (
					<div className="form-container">
			<h1>Account</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<label htmlFor="currency">Currency</label>
					<input required
						type="text"
						id="currency"
						name="currency"
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						placeholder="CFA"
					/>
				</div>
				<div className="form-input">
					<label htmlFor="amount">Amount</label>
					<input required
						type="text"
						id="amount"
						name="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<button className="btn btn-block">Add</button>
				</div>
			</form>
		</div>
				)}
			</div>
		</>
	);
};

export default Wallet;
