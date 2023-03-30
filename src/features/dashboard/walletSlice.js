import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/Constants";
import axios from "axios";

const initialState = {
	wallets: [],
	wallet: {},
	isLoading: false,
	isError: false,
	message: "",
};

export const getWallets = createAsyncThunk(
	"wallet/wallets",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
				 
			}
			const response = await axios.get(`${API_URL}/wallet/list`, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const createWallet = createAsyncThunk(
	"wallet/createwallet",
	async (walletData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
			const response = await axios.post(`${API_URL}/wallet/add`, walletData, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

const walletSlice = createSlice({
	name: "wallet",

	initialState,

	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(getWallets.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(getWallets.fulfilled, (state, action) => {
			state.isLoading = false

			state.wallets = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(getWallets.rejected, (state, action) => {
			state.isLoading = false

			state.wallets = []

			state.isError = true

			state.message = action.payload
		});
		builder.addCase(createWallet.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(createWallet.fulfilled, (state, action) => {
			state.isLoading = false

			state.wallets = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(createWallet.rejected, (state, action) => {
			state.isLoading = false

			state.wallets = []

			state.isError = true

			state.message = action.payload
		});
	},
});

export default walletSlice.reducer;
export const { reset } = walletSlice.actions;
