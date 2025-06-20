import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosInstance =axios.create({
  baseURL: 'http://192.168.1.68:3000/',
});
axiosInstance.interceptors.request.use(async config=>{
    const token =await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});