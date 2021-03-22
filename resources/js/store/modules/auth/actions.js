import User from "../../../api/Auth";
import router from "../../../router/router";

export const getUsers = ({ commit }) => {
	User.all()
		.then((response) => {
			commit("SET_USERS", response.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

export const getUser = ({ commit }, uId) => {
	User.show(uId)
		.then((response) => {
			commit("SET_USER", response.data.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

export const storeUser = ({ commit, dispatch }, formData) => {
	User.store(formData)
		.then(() => {
			commit("SET_USER_ERROR", []);
			dispatch("addNotification", { type: "success", message: "User created successfully 😊" }, { root: true });
			User.all().then((response) => {
				commit("SET_USERS", response.data);
			});
		})
		.catch((error) => {
			if (error.response.status == 422) {
				commit("SET_USER_ERROR", error.response.data.errors);
				dispatch("addNotification", { type: "danger", message: "Something went wrong! Try again. 😞" }, { root: true });
			}
		});
};

/* ------------------------------------------------------------------------------------------------------------------ */
/*          //TODO: Action is used to create GUEST from application & can later be assigned ROLE by the ADMIN         */
/* ------------------------------------------------------------------------------------------------------------------ */

export const addUser = ({ commit, dispatch }, formData) => {
	User.register(formData)
		.then(() => {
			commit("SET_USER_ERROR", []);
			router.push({ name: "Login" });
			dispatch("addNotification", { type: "success", message: "Registration Completed 😊" }, { root: true });
		})
		.catch((error) => {
			if (error.response.status == 422) {
				commit("SET_USER_ERROR", error.response.data.errors);
			}
		});
};

export const updateUser = ({ commit, dispatch }, data) => {
	User.update(data)
		.then(() => {
			commit("SET_USER_ERROR", []);
			dispatch("addNotification", { type: "success", message: "User updated successfully 😊" }, { root: true });
			User.all().then((response) => {
				commit("SET_USERS", response.data);
			});
		})
		.catch((error) => {
			if (error.response.status == 422) {
				commit("SET_USER_ERROR", error.response.data.errors);
			}
		});
};

export const deleteUser = ({ commit, dispatch }, uId) => {
	User.delete(uId).then(() => {
		dispatch("addNotification", { type: "danger", message: "User deleted successfully 😞" }, { root: true });
		User.all().then((response) => {
			commit("SET_USERS", response.data);
		});
	});
};

export const loginUser = ({ commit, dispatch }, formData) => {
	User.login(formData)
		.then((response) => {
			commit("SET_AUTHENTICATED", true);
			commit("SET_AUTH_USER", response.data);
			commit("SET_USER_ERROR", []);
			router.push({ name: "admin.dashboard" });
			dispatch("addNotification", { type: "success", message: "Welcome to Leemahshop 😊" }, { root: true });
		})
		.catch((error) => {
			if (error.response.status == 422) {
				commit("SET_AUTHENTICATED", false);
				commit("SET_AUTH_USER", null);
				commit("SET_USER_ERROR", error.response.data.errors);
				dispatch("addNotification", { type: "danger", message: "Login Unsuccessful 😞" }, { root: true });
			}
		});
};

export const logoutUser = ({ commit }) => {
	User.logout()
		.then(() => {
			commit("SET_AUTHENTICATED", false);
			commit("SET_AUTH_USER", null);
			commit("SET_USER_ERROR", []);
			router.push({ name: "Home" });
		})
		.catch((error) => {
			if (error.response.status == 422) {
				commit("SET_USER_ERROR", error.response.data.errors);
			}
		});
};

export const getAuthUser = ({ commit }) => {
	User.auth()
		.then((response) => {
			commit("SET_AUTHENTICATED", true);
			commit("SET_AUTH_USER", response.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

export const getPagination = ({ commit }, page) => {
	if (typeof page === "undefined") {
		page = 1;
	}
	User.pagination(page).then((response) => {
		commit("SET_PAGINATION", response.data);
	});
};

export const searchAdminUser = ({ commit }, query) => {
	let params = {
		query,
	};
	User.userSearch(params).then((response) => {
		commit("SET_USERS", response.data);
	});
};
