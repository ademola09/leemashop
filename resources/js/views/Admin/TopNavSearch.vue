<template>
	<div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
		<div class="input-group">
			<input
				v-model="search"
				type="text"
				class="form-control bg-light border-0 small"
				placeholder="Search for..."
				aria-label="Search"
				aria-describedby="basic-addon2"
			/>
			<div class="input-group-append">
				<button @click="searchMaster" @keyup.enter="searchMaster" class="btn btn-primary-prime" type="button">
					<i class="fas fa-search fa-sm"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import _ from "lodash";
	export default {
		name: "TopNavSearch",

		data() {
			return {
				search: "",
				type: false,
			};
		},
		watch: {
			search: {
				handler: _.debounce(function() {
					// this.searchAdminCategory(this.search);
					// this.searchAdminProduct(this.search);
					this.searchAdminUser(this.search);
				}, 1000),
			},
		},
		methods: {
			...mapActions({
				// // searchAdminCategory: "category/searchAdminCategory",
				// // searchAdminProduct: "product/searchAdminProduct",
				searchAdminUser: "auth/searchAdminUser",
			}),

			searchMaster() {
				// this.searchAdminCategory(this.search);
				// this.searchAdminProduct(this.search);
				this.searchAdminUser(this.search);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn-primary-prime {
		background-color: #ff7799;
		color: #fff;
	}
	input{
    // outline: 1px solid #ff7799;
		caret-color: #ff7799;
	}
</style>
