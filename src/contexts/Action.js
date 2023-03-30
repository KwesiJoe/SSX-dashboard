import axios from "axios";
import { API_URL } from "../constants/Constants";

const registerEndpoint = `${API_URL}/auth/signup`
const loginEndpoint = `${API_URL}/auth/signin`

export const register = async (userData) => {
	const response = await axios.post(registerEndpoint, userData);
	try {
		if (response.data){
			localStorage.setItem('user', JSON.stringify(response.data))
		}
		return response.data;
	} catch (error) {
		return error.message;
	}
}

export const login = async (userData) => {
	const response = await axios.post(loginEndpoint, userData);
	// if (response.data){
	// 	localStorage.setItem('user', JSON.stringify(response.data))
	// }
	try {
		if (response.data){
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		return error.message;
	}
	
}