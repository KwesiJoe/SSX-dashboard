import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/Constants";
import axios from "axios";

const data = JSON.parse(localStorage.getItem('user'))
console.log(data)

const initialState = {
	user: data ? data : null,

	isLoading: false,

	isError: false,

	message: "",
};



export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(`${API_URL}/auth/signup`, userData);

			if (response.data) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(`${API_URL}/auth/signin`, userData);

			if (response.data) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			return response.data;
		} catch (error) {
			const message = error.message || error.response.data || error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async () => {
		await localStorage.clear('user')
	}
		)

const authSlice = createSlice({
	name: "auth",

	initialState,

	reducers: {
		reset: (state) => initialState,
	},

	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoading = false

			state.user = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(register.rejected, (state, action) => {
			state.isLoading = false

			state.user = null

			state.isError = true

			state.message = action.payload
		});
		builder.addCase(login.pending, (state) => {
			state.isLoading = true
		});

		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false

			state.user = action.payload

			state.isError = false

			state.message = ""
		});

		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false

			state.user = null

			state.isError = true

			state.message = action.payload
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.user = null
		});
	},
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
