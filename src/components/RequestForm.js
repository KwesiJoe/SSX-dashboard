import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccounts } from "../features/dashboard/accountSlice";
import { createRequest } from "../features/dashboard/requestSlice";

function RequestForm() {

	const [currency, setCurrency] = useState("");
	const [provider, setProvider] = useState("");
	const [quantity, setQuantity] = useState("");
	const [deliveryAccount, setDeliveryAccount] = useState("");
	const [timeframe, setTimeframe] = useState("");

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user, isLoading, isError, message } = useSelector(
		(state) => state.auth
	);

	function handleSubmit(e) {
		e.preventDefault();
		const requestData = {
			currency,
			provider,
			quantity,
			deliveryAccount,
			timeframe
		}

		dispatch(createRequest(requestData));

		setCurrency("");
		setProvider("");
		setQuantity("");
		setDeliveryAccount("");
		setTimeframe("");
	}

	return (
		<div className="form-container">
			<h1>Fx Request</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-input">
					<label htmlFor="currency">Currency</label>
					<input required
						type="text"
						id="currency"
						name="currency"
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="provider">Provider</label>
					<input required
						type="text"
						id="provider"
						name="provider"
						value={provider}
						onChange={(e) => setProvider(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="quantity">Quantity</label>
					<input required
						type="text"
						id="quantity"
						name="quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="deliveryAccount">Delivery Account</label>
					<input required
						type="text"
						id="deliveryAccount"
						name="deliveryAccount"
						value={deliveryAccount}
						onChange={(e) => setDeliveryAccount(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<label htmlFor="timeframe">Timeframe</label>
					<input required
						type="text"
						id="timeframe"
						name="timeframe"
						value={timeframe}
						onChange={(e) => setTimeframe(e.target.value)}
					/>
				</div>
				<div className="form-input">
					<button className="btn btn-block">Add</button>
				</div>
			</form>
		</div>
	);
}

export default RequestForm;