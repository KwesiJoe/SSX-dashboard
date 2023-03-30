import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/Constants";
import axios from "axios";

const initialState = {
	requests: [],
	request: {},
	isLoading: false,
	isError: false,
	message: "",
};

export const getRequests = createAsyncThunk(
	"request/requests",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
				 
			}
			const response = await axios.get(`${API_URL}/order/myorders`, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const createRequest = createAsyncThunk(
	"request/createrequest",
	async (walletData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(thunkAPI.getState().auth.user)
			const config = {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
			const response = await axios.post(`${API_URL}/order/create`, walletData, config);
			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

const requestSlice = createSlice({
	name: "request",

	initialState,

	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(getRequests.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(getRequests.fulfilled, (state, action) => {
			state.isLoading = false

			state.wallets = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(getRequests.rejected, (state, action) => {
			state.isLoading = false

			state.wallets = []

			state.isError = true

			state.message = action.payload
		});
		builder.addCase(getRequests.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(getRequests.fulfilled, (state, action) => {
			state.isLoading = false

			state.wallets = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(getRequests.rejected, (state, action) => {
			state.isLoading = false

			state.wallets = []

			state.isError = true

			state.message = action.payload
		});
	},
});

export default requestSlice.reducer;
export const { reset } = requestSlice.actions;
