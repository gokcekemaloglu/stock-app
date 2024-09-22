import useAxios from './useAxios'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getFirmBrandProPurSuccess, getProCatBrandSuccess, getPurSalesSuccess, getSalesBrandProSuccess, getStockSuccess } from '../features/stockSlice'
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
        // console.log(endpoint);
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
        // console.log(endpoint);
        try {
            const {data} = await axiosWithToken.put(`${endpoint}/${info._id}`, info)
            console.log(data.data);            
            toastSuccessNotify("Purchase updated")
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify(error.message)
        } finally {
            getStockData(endpoint)
        }
    }
    
    const deleteStockData = async(endpoint, id) => {
        dispatch(fetchStart())
        // console.log(endpoint);        
        try {
            await axiosWithToken.delete(`${endpoint}/${id}`)                  
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
            const [firms, brands, products, purchases] = await Promise.all([
                axiosWithToken("firms"),
                axiosWithToken("brands"),
                axiosWithToken("products"),
                axiosWithToken("purchases"),
            ])
            // console.log(firms);
            
            dispatch(getFirmBrandProPurSuccess([firms?.data?.data, brands?.data?.data, products?.data?.data, purchases?.data?.data]))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

    const getSalesBrandPro = async () => {
        dispatch(fetchStart())
        try {
            const [sales, brands, products] = await Promise.all([
                axiosWithToken("sales"),
                axiosWithToken("brands"),
                axiosWithToken("products"),
            ])
            console.log("sales:",sales);
            dispatch(getSalesBrandProSuccess([sales?.data?.data, brands?.data?.data, products?.data?.data]))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

    const getPurSales = async () => {
        dispatch(fetchStart())
        try {
            const [purchases, sales] = await Promise.all([
                axiosWithToken("purchases"),
                axiosWithToken("sales"),
            ])
            console.log("sales:",sales);
            dispatch(getPurSalesSuccess([purchases?.data, sales?.data]))
        } catch (error) {
            dispatch(fetchFail())
        }
    }

  return {getStockData, postStockData, putStockData, deleteStockData, getProCatBrand, getFirmBrandProPur, getSalesBrandPro, getPurSales}
}

export default useStockCall