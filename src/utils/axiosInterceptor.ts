import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance =axios.create({
  baseURL: 'http://localhost:3000/',
});
axiosInstance.interceptors.request.use(config=>{
    const token = AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});