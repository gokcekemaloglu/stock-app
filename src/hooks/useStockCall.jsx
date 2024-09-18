import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart } from '../features/stockSlice'

const useStockCall = () => {

    const dispatch = useDispatch()
    const axiosWithToken = useAxios()    

    const getStockData = async(endpoint) => {
        dispatch(fetchStart())
        console.log(endpoint);
        // Simulate a call to an API
        try {
            const {data} = await axiosWithToken.get(endpoint)
            console.log(data.data);            
            dispatch(getStockSuccess({stock:data.data},endpoint))
        } catch (error) {
            dispatch(fetchFail())
        }        
    }

  return {getStockData}
}

export default useStockCall