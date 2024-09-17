import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from "../features/authSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useAxios, { axiosPublic } from "../pages/useAxios"

const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuthCall = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = useSelector(state=>state.auth)
  const {axiosWithToken} = useAxios()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
        const {data} = await axiosPublic.post("users/", userInfo)
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
        const {data} = await axiosPublic.post("auth/login", userInfo)
        console.log(data);
        dispatch(loginSuccess(data))
        toastSuccessNotify("Logged in successfully")
        navigate("/stock")
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Login failed")
    }    
  }

  const logout = async () => {
    dispatch(fetchStart())
    try {
        await axiosWithToken.get("auth/logout/")
        dispatch(logoutSuccess())
        toastSuccessNotify("Logged out")
        navigate("/")
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Logout failed")
    }    
  }

  return {register, login, logout}
}

export default useAuthCall