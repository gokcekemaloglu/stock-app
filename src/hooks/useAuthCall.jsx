import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, registerSuccess } from "../features/authSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuthCall = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
        const {data} = await axios.post(`${BASE_URL}users/`, userInfo)
        console.log(data);
        dispatch(registerSuccess(data))
        toastSuccessNotify("Your account has been created successfully!")
        navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Registiration failed")
    }    
  }  

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
        const {data} = await axios.post(`${BASE_URL}auth/login`, userInfo)
        console.log(data);
        dispatch(registerSuccess(data))
        toastSuccessNotify("Logged in successfully")
        navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Login failed")
    }    
  }

  return {register, login}
}

export default useAuthCall