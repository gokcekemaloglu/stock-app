import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart } from "../features/authSlice"

const useAuthCall = () => {

    const dispatch = useDispatch()

  const register = async () => {
    dispatch(fetchStart())
    try {
        const {data} = await axios.post("https://19101.fullstack.clarusway.com/users/")
        console.log(data);
        
    } catch (error) {
        dispatch(fetchFail())
    }
    
  }
}

export default useAuthCall