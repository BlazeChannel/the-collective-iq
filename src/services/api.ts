// import axios from "axios";

// const api = axios.create({
//     baseURL: '',
//     headers: { 'Content-Type' : 'application/json' },
// })
// export default api

// api.js

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// export const apiRequest = async (endpoint, method = 'GET', body = null) => {
//   const options = {
//     method,
//     headers: { 'Content-Type': 'application/json' },
//     ...(body && { body: JSON.stringify(body) }),
//   };

//   try {
//     const response = await fetch(`${API_URL}${endpoint}`, options);
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Something went wrong");
//     return data;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };
import axios from "axios";

const api = axios.create({
   // baseURL: 'https://ca44bd156ff47d74bc2f.free.beeceptor.com/api',
   baseURL: '',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const { config, response: { status } } = error;
        if (status === 429) {  // Too Many Requests
            const retryAfter = error.response.headers['retry-after'] || 1;
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return api(config);
        }
        return Promise.reject(error);
    }
);

export default api;
