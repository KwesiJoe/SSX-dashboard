import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/Constants";
import axios from "axios";

const initialState = {
	providers: [],
	isLoading: false,
	isError: false,
	message: "",
};

export const getProviders = createAsyncThunk(
	"provider/providers",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
				 
			}
			const response = await axios.get(`${API_URL}/providers/list`, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// export const createWallet = createAsyncThunk(
// 	"wallet/createwallet",
// 	async (walletData, thunkAPI) => {
// 		try {
// 			const token = thunkAPI.getState().auth.user.token;
// 			console.log(thunkAPI.getState().auth.user)
// 			const config = {
// 				headers: {
// 					"Authorization": `Bearer ${token}`
// 				}
// 			}
// 			const response = await axios.post(`${API_URL}/wallet/add`, walletData, config);
// 			return response.data;
// 		} catch (error) {
// 			const message = error.message || error.response.data || error.toString();

// 			return thunkAPI.rejectWithValue(message);
// 		}
// 	}
// );

const providerSlice = createSlice({
	name: "provider",

	initialState,

	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(getProviders.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(getProviders.fulfilled, (state, action) => {
			state.isLoading = false

			state.providers = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(getProviders.rejected, (state, action) => {
			state.isLoading = false

			state.providers = []

			state.isError = true

			state.message = action.payload
		});
	},
});

export default providerSlice.reducer;
export const { reset } = providerSlice.actions;
