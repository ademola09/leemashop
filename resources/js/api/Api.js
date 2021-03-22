import axios from "axios";

const Api = axios.create({
	baseURL: "http://leemah.test/api",
});

Api.defaults.withCredentials = true;

export default Api;
