import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://aisha-collection.herokuapp.com/api/ "
})