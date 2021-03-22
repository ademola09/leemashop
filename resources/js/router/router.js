import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

import Admin from "../views/Admin/Admin.vue";
import Dashboard from "../views/Admin/Dashboard.vue";
import Users from "../views/Admin/Users.vue";
import Categories from "../views/Admin/Categories.vue";

import Products from "../views/Product/Products.vue";
import ProductTable from "../views/Product/ProductTable.vue";
// import ProductImages from "../views/Product/ProductImages.vue";

import Tags from "../views/Admin/Tags.vue";
import Orders from "../views/Admin/Orders.vue";
import Profile from "../views/Admin/Profile.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "Home | Leemashop",
			metaTags: [
				{
					name: "description",
					content: "The home page of leemashop.",
				},
				{
					property: "og:description",
					content: "The home page of leemashop.",
				},
			],
		},
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
		meta: {
			guestAuth: true,
			title: "Register | Leemashop",
			metaTags: [
				{
					name: "description",
					content: "The register page of leemashop.",
				},
				{
					property: "og:description",
					content: "The register page of leemashop.",
				},
			],
		},
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: {
			guestAuth: true,
			title: "Login | Leemashop",
			metaTags: [
				{
					name: "description",
					content: "The login page of leemashop.",
				},
				{
					property: "og:description",
					content: "The login page of leemashop.",
				},
			],
		},
	},
	{
		path: "/forgot-password",
		name: "ForgotPassword",
		component: ForgotPassword,
		meta: {
			title: "Forgot Password | Leemashop",
			metaTags: [
				{
					name: "description",
					content: "The reset password page of leemashop.",
				},
				{
					property: "og:description",
					content: "The reset password page of leemashop.",
				},
			],
		},
	},
	{
		path: "/admin",
		component: Admin,
		meta: {
			adminAuth: true,
			title: "Admin - Leemashop",
		},
		children: [
			{
				path: "",
				name: "admin.dashboard",
				component: Dashboard,
				meta: {
					title: "Admin | Dashboard - Leemashop",
				},
			},
			{
				path: "users",
				name: "admin.users",
				component: Users,
				meta: {
					title: "Admin | Users - Leemashop",
				},
			},
			{
				path: "categories",
				name: "admin.categories",
				component: Categories,
				meta: {
					title: "Admin | Categories - Leemashop",
				},
			},
			{
				path: "products",
				component: Products,
				children: [
					{
						path: "",
						name: "admin.products",
						component: ProductTable,
						meta: {
							title: "Admin | Products - Leemashop",
						},
					},
					// {
					// 	path: "images",
					// 	name: "products.images",
					// 	component: ProductImages,
					// 	meta: {
					// 		title: "Admin | Product Images - Leemashop",
					// 	},
					// },
					{
						path: "tags",
						name: "products.tags",
						component: Tags,
						meta: {
							title: "Admin | Product Tags - Leemashop",
						},
					},
				],
			},
			{
				path: "orders",
				name: "admin.orders",
				component: Orders,
				meta: {
					title: "Admin | Orders - Leemashop",
				},
			},
			{
				path: "profile",
				name: "admin.profile",
				component: Profile,
				meta: {
					title: "Admin | Profiles - Leemashop",
				},
			},
		],
	},
	{
		path: "*",
		component: require("../components/NotFound.vue").default,
		meta: {
			title: "Error 404 | Leemashop",
			metaTags: [
				{
					name: "description",
					content: "The error 404 page of leemashop.",
				},
				{
					property: "og:description",
					content: "The error 404 page of leemashop.",
				},
			],
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	linkActiveClass: "active",
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0,
		};
	},
});

router.beforeEach((to, from, next) => {
	function isLoggedIn() {
		let authUser = store.getters["auth/authenticated"];
		return authUser;
	}
	if (to.matched.some((record) => record.meta.adminAuth)) {
		if (!isLoggedIn()) {
			next({
				path: "/login",
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.guestAuth)) {
		if (isLoggedIn()) {
			next({
				path: "/",
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}

	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);
	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	// if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else {
		document.title = previousNearestWithMeta.meta.title;
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((el) => el.parentNode.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement("meta");

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create, so we don't interfere with other ones.
			tag.setAttribute("data-vue-router-controlled", "");

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag));

	next();
});

export default router;
