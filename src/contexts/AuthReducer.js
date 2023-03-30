export const authReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_USER':
			return {
				...state, 
				user: action.payload,
			};
		case 'LOG_USER':
			return {
				...state,
				user: action.payload
			};
		case 'ERROR_USER':
			return{
				...state,
				message: action.payload,
				isError: true,
			};

		default:
			return state;
	}
}