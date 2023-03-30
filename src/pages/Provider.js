import Header from "../components/Header";
import BankAccountForm from "../components/BankAccountForm";
import { useDispatch, useSelector } from "react-redux";
import { getProviders } from "../features/dashboard/providerSlice";
import { useState, useEffect } from "react";


const Provider = () => {


	const [name, setName] = useState("");
	const [website, setWebsite] = useState("");

	const [show, setShow] = useState(false); 
	const dispatch = useDispatch();
	const { providers, isLoading, isError, message } = useSelector(
		(state) => state.provider
	)

	useEffect(() => {
		dispatch(getProviders());
	}, [dispatch]);

	console.log(providers);

	return (
		<>
			<Header />
			<div className="main-container">
				{isLoading && <h1>Loading...</h1>}
				{!isLoading && isError ? <div>Error:{message}</div> : null}
				<div className="account-header">
				<h1>Providers</h1>
				</div>
				<table>
						<thead>
							<tr>
								<th>Provider</th>
								<th>Website</th>
							</tr>
						</thead>
						<tbody>
							{!isLoading && providers.length
								? providers?.map((provider) => (
										<tr key={provider.id}>
											<td>{provider.name}</td>
											<td>{provider.website}</td>
										</tr>
								  ))
								: null}
						</tbody>
					</table>
			</div>
		</>
	);
};

export default Provider;
