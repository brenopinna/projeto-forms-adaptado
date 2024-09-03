import axios from "axios"

export const bff: Axios.AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})
