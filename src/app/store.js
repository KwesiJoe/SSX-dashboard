import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountReducer from "../features/dashboard/accountSlice"
import walletReducer from "../features/dashboard/walletSlice"
import providerReducer from "../features/dashboard/providerSlice"

const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			bankaccount: accountReducer,
			wallet: walletReducer,
			provider: providerReducer
		}
	}
)

export default store;