import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getStockSuccess } from '../features/stockSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'

const useStockCall = () => {

    const dispatch = useDispatch()
    const axiosWithToken = useAxios()    

    const getStockData = async(endpoint) => {
        dispatch(fetchStart())
        console.log(endpoint);        
        try {
            const {data} = await axiosWithToken.get(endpoint)
            console.log(data.data);            
            dispatch(getStockSuccess({stock: data.data, endpoint}))
            toastSuccessNotify(endpoint)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        }        
    }

  return {getStockData}
}

export default useStockCall