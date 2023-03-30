import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/Constants";
import axios from "axios";

const initialState = {
	bankAccounts: [],
	bankAccount: {},
	isLoading: false,
	isError: false,
	message: "",
};

export const getBankAccounts = createAsyncThunk(
	"bankAccount/getBankAccounts",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
				 
			}
			const response = await axios.get(`${API_URL}/bankaccounts`, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const createBankAccounts = createAsyncThunk(
	"bankAccount/createBankAccounts",
	async (userData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
			const response = await axios.post(`${API_URL}/bankaccounts/add`, userData, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

const bankAccountSlice = createSlice({
	name: "bankaccount",

	initialState,

	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(getBankAccounts.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(getBankAccounts.fulfilled, (state, action) => {
			state.isLoading = false

			state.bankAccounts = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(getBankAccounts.rejected, (state, action) => {
			state.isLoading = false

			state.bankAccounts = []

			state.isError = true

			state.message = action.payload
		});
	},
});

export default bankAccountSlice.reducer;
export const { reset } = bankAccountSlice.actions;
