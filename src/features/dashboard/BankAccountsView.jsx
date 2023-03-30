import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccounts } from "./accountSlice";
import { Link, Outlet } from "react-router-dom";
import BankAccountForm from "../../components/BankAccountForm";

const BankAccountsView = () => {
	const [show, setShow] = useState(false); 
	const dispatch = useDispatch();
	const { bankAccounts, isLoading, isError, message } = useSelector(
		(state) => state.bankaccount
	);


	useEffect(() => {
		dispatch(getBankAccounts());
	}, [dispatch]);

	const handleShow = () => {
		setShow(prevState=>!prevState)
	}

	return (
		<div className="main-container">
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && isError ? <div>Error:{message}</div> : null}
			<div className="account-header">
			{
				!show ? (<h1>List of accounts</h1>) : (<span onClick={()=>setShow(false)} style={{color: "black"}}>back</span>)
			}
			<button onClick={handleShow} className="btn btn-primary">add Account</button>
			</div>
			{
				!show ? (<table>
					<thead>
						<tr>
							<th>Identifier</th>
							<th>Bank</th>
							<th>Account Name</th>
							<th>Account Number</th>
							<th>Action</th>
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
				</table>) : (<BankAccountForm/>)
			}
		</div>
	);
};

export default BankAccountsView;
