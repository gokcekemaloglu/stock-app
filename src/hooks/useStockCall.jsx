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
    
    const postStockData = async(endpoint, info) => {
        dispatch(fetchStart())
        console.log(endpoint);        
        try {
            const {data} = await axiosWithToken.post(endpoint, info)
            console.log(data);            
            toastSuccessNotify(endpoint)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        }        
    }
    
    const putStockData = async(endpoint, info) => {
        dispatch(fetchStart())
        console.log(endpoint);        
        try {
            const {data} = await axiosWithToken.put(`${endpoint}/${info._id}`)
            console.log(data.data);            
            toastSuccessNotify(endpoint)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        }        
    }

  return {getStockData, postStockData, putStockData}
}

export default useStockCall