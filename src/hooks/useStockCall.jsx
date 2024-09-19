import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getProCatBrandSuccess, getStockSuccess } from '../features/stockSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'

const useStockCall = () => {

    const dispatch = useDispatch()
    const axiosWithToken = useAxios()    

    const getStockData = async(endpoint) => {
        dispatch(fetchStart())
        // console.log(endpoint);
        try {
            const {data} = await axiosWithToken.get(endpoint)
            // console.log(data.data);
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

    const getProCatBrand = async () => {
        dispatch(fetchStart())
        try {
            const [products, categories, brands] = await Promise.all([
                axiosWithToken("products"),
                axiosWithToken("categories"),
                axiosWithToken("brands"),
            ])
            console.log("products:",products);
            dispatch(getProCatBrandSuccess([products?.data?.data, categories?.data?.data, brands?.data?.data]))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

    const getFirmBrandProPur = async () => {
        dispatch(fetchStart())
        try {
            const [firms, brands, products, purchases] = Promise.all([
                axiosWithToken("firms"),
                axiosWithToken("brands"),
                axiosWithToken("products"),
                axiosWithToken("purchases"),
            ])
            console.log(firms);
            
            // dispatch(getFirmBrandProSuccess([firms?.data?.data, brands?.data?.data, products?.data?.data, purchases?.data?.data]))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

  return {getStockData, postStockData, putStockData, deleteStockData, getProCatBrand, getFirmBrandProPur}
}

export default useStockCall