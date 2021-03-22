import Api from "./Api";
import Cookie from "js-cookie";

const END_POINT = "/csrf-cookie";

export default {
	getCookie() {
		let token = Cookie.get("XSRF-TOKEN");
		if (token) {
			return new Promise((resolve) => {
				resolve(token);
			});
		}
		return Api.get(END_POINT);
	},
};
