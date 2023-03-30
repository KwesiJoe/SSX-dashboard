import Header from "../components/Header";
import BankAccountsView from "../features/dashboard/BankAccountsView";
// import { Outlet } from "react-router-dom";


function BankAccounts() {
	return (
		<div>
			<Header />
			<BankAccountsView/>
		</div>
	);
}

export default BankAccounts;
