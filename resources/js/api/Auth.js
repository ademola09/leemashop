import Api from "./Api";
import Csrf from "./Csrf";

const END_POINT = "v1/users";

export default {
	all() {
		return Api.get("v1/users");
	},

	store(data) {
		return Api.post(END_POINT, data);
	},

	show(uId) {
		return Api.get(`${END_POINT}/${uId}`);
	},

	update(data) {
		return Api.put(`${END_POINT}/${data.id}`, data);
	},

	delete(uId) {
		return Api.delete(`${END_POINT}/${uId}`);
	},

	async register(data) {
		await Csrf.getCookie();
		return Api.post("v1/register", data);
	},

	async login(data) {
		await Csrf.getCookie();
		return Api.post("v1/login", data);
	},

	async logout() {
		await Csrf.getCookie();
		return Api.post("v1/logout");
	},

	auth() {
		return Api.get("/user");
	},

	pagination(page) {
		return Api.get(`${END_POINT}?page=${page}`);
	},

	userSearch(params) {
		return Api.get(`v1/userSearch`, {params});
	},
};
