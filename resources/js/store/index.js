import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from 'js-cookie';

Vue.use(Vuex);

import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

import auth from "./modules/auth";

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,

	modules: {
		auth,
	},

	plugins: [createPersistedState()],
});
