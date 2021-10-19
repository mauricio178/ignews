import axios from "axios"

const api = axios.create({
    baseURL: 'https://api.solution4apps.com/0.0.1/api/public/api/',
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
        
    }
})

export default api;