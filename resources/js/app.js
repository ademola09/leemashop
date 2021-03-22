import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

require("./bootstrap");

window.Vue = require("vue").default;

// * Moment will nicely format Dates and Time in JavaScript
import moment from "moment";
Vue.filter("formatDate", (created) => {
	return moment(created).format("MMMM Do, YYYY");
});

Vue.component("pagination", require("laravel-vue-pagination"));

Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
	el: "#app",
	router,
	store,
	render: (h) => h(App),
});
