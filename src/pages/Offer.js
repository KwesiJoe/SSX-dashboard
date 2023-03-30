import Header from "../components/Header";
import BankAccountForm from "../components/BankAccountForm";
import { useDispatch, useSelector } from "react-redux";
import { getProviders } from "../features/dashboard/providerSlice";
import { useState, useEffect } from "react";

const Offer = () => {
	const [offers, setOffers] = useState([
		{
			currencyPair: "USD/GHC",
			exchangeRate: 11.5,
			MaxVolume: 16000,
		},
		{
			currencyPair: "USD/GHC",
			exchangeRate: 11.59,
			MaxVolume: 17000,
		},
		{
			currencyPair: "USD/GHC",
			exchangeRate: 11.63,
			MaxVolume: 18000,
		},
		{
			currencyPair: "USD/GHC",
			exchangeRate: 10.5,
			MaxVolume: 20000,
		},
		{
			currencyPair: "USD/GHC",
			exchangeRate: 11.4,
			MaxVolume: 21000,
		},
		{
			currencyPair: "USD/GHC",
			exchangeRate: 11.3,
			MaxVolume: 22000,
		},
	]);

	// useEffect(() => {
	// 	dispatch(getProviders());
	// }, [dispatch]);

	return (
		<>
			<Header />
			<div className="main-container">
				{/* {isLoading && <h1>Loading...</h1>} */}
				{/* {!isLoading && isError ? <div>Error:{message}</div> : null} */}
				<div className="account-header">
					<h1>Offers</h1>
				</div>
				<table>
					<thead>
						<tr>
							<th>Currency Pair</th>
							<th>Exchange Rate</th>
							<th>Maximum Volume</th>
						</tr>
					</thead>
					<tbody>
						{offers.length
							? offers?.map((offer) => (
									<tr key={offer.currencyPair+offer.exchangeRate+offer.MaxVolume}>
										<td>{offer.currencyPair}</td>
										<td>{offer.exchangeRate}</td>
										<td>{offer.MaxVolume}</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Offer;
