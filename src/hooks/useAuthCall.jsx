import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart } from "../features/authSlice"

const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuthCall = () => {

  const dispatch = useDispatch()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
        const {data} = await axios.post(`${BASE_URL}users/`, userInfo)
        console.log(data);        
    } catch (error) {
        dispatch(fetchFail())
    }    
  }
  

  const login = async () => {
    dispatch(fetchStart())
    try {
        const {data} = await axios.post(`${BASE_URL}auth/login`)
        console.log(data);        
    } catch (error) {
        dispatch(fetchFail())
    }    
  }

  return {register, login}
}

export default useAuthCall