import {createContext, useContext, useReducer} from "react";
import { authReducer } from "./AuthReducer";


const AuthContext = createContext();
const ContextProvider = ({children}) => {
  
  const data = localStorage.getItem('user')

  const initialState = {
    user: data ? data : null,
    isLoading: false,
    isError: false,
    message: "",
  }

  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
      <AuthContext.Provider value={{state, dispatch}}>
        {children}
      </AuthContext.Provider>
  )
};

export default ContextProvider;

export const UserState = () => {
  return useContext(AuthContext);
}