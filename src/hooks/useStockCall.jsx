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
        } finally {
            getStockData(endpoint)
        }
    }
    
    const putStockData = async(endpoint, info) => {
        dispatch(fetchStart())
        console.log(endpoint);        
        try {
            const {data} = await axiosWithToken.put(`${endpoint}/${info._id}`, info)
            console.log(data.data);            
            toastSuccessNotify("Firm updated")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        } finally {
            getStockData(endpoint)
        }
    }
    
    const deleteStockData = async(endpoint, id) => {
        dispatch(fetchStart())
        console.log(endpoint);        
        try {
            await axiosWithToken.delete(`${endpoint}/${id}`)
            console.log(data.data);            
            toastSuccessNotify(`${endpoint}Firm deleted`)
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        } finally {
            getStockData(endpoint)
        }
    }

  return {getStockData, postStockData, putStockData, deleteStockData}
}

export default useStockCall