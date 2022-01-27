import axios from "axios";

export const baseUrlAxios = axios.create({
    baseURL: "http://192.168.0.172:3000/",
    headers: {
        'Content-Type': 'application/json'
    },
})