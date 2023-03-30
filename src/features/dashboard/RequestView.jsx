import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "./requestSlice";
import { Link, Outlet } from "react-router-dom";
import RequestForm from "../../components/RequestForm";
import Header from "../../components/Header";

const RequestView = () => {
	const [show, setShow] = useState(false); 
	const dispatch = useDispatch();
	const { bankAccounts, isLoading, isError, message } = useSelector(
		(state) => state.bankaccount
	);

	console.log(bankAccounts);

	useEffect(() => {
		dispatch(getRequests());
	}, [dispatch]);

	const handleShow = () => {
		setShow(prevState=>!prevState)
	}

	return (
		<>
		<Header />
		<div className="main-container">
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && isError ? <div>Error:{message}</div> : null}
			<div className="account-header">
			{
				!show ? (<h1>List of Requests</h1>) : (<span onClick={()=>setShow(false)} style={{color: "black"}}>back</span>)
			}
			<button onClick={handleShow} className="btn btn-primary">make a request</button>
			</div>
			{
				!show ? (<table>
					<thead>
						<tr>
							<th>Currency</th>
							<th>Provider</th>
							<th>Quantity</th>
							<th>Delivery Account</th>
							<th>Request Date</th>
							<th>Timeframe</th>
						</tr>
					</thead>
					<tbody>
						{
							!isLoading && bankAccounts.length ?(
									bankAccounts?.map(acc =>(
										<tr key={acc.id}>
											<td>{acc.identifier}</td>
											<td>{acc.bankName}</td>
											<td>{acc.accountName}</td>
											<td>{acc.accountNumber}</td>
											<td>delete</td>
										</tr>
	
									))
							   ):null
						}
					</tbody>
				</table>) : (<RequestForm/>)
			}
		</div>
		</>
	);
};

export default RequestView;
