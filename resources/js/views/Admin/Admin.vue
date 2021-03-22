<template>
	<div id="page-top">
		<div id="wrapper">
			
			<SideBar />

			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<TopBar :user="user" :isAuth="authenticated" />
					<!-- <NotFound /> -->
					<router-view></router-view>
					<!-- <vue-progress-bar></vue-progress-bar> -->
				</div>

				<Footer />

			</div>
		</div>

		<a class="scroll-to-top rounded" href="#page-top">
			<i class="fas fa-angle-up"></i>
		</a>
	</div>
</template>

<script>
	import SideBar from "./Sidebar";
	import TopBar from "./Topbar";
	import Footer from "./Footer";
	import NotFound from "../../components/NotFound";
	import { mapActions, mapGetters } from "vuex";
	export default {
		components: { SideBar, TopBar, Footer, NotFound },

		computed: {
			...mapGetters({
				authenticated: "auth/authenticated",
				user: "auth/user",
			}),
		},

		methods: {
			...mapActions("auth", ["getAuthUser"]),
		},
		mounted() {
			this.getAuthUser();
		},
	};
</script>

<style lang="scss" scoped></style>
