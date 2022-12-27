import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL + "api/";
axios.defaults.headers.common["sys-token-api"] = import.meta.env.VITE_API_TOKEN;
export default axios;
