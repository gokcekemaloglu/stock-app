import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const axiosWithToken = useAxios();

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("users/", userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Account created successfully!");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message, "Registiration failed");
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("auth/login", userInfo);
      // console.log(data);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Logged in successfully");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(error.message, "Login failed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.get("auth/logout/");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(error.message, "Logout failed");
    }
  };

  return { register, login, logout };
};

export default useAuthCall;
