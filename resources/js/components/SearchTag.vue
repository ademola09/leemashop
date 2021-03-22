<template>
	<div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
		<div class="input-group">
			<input v-model="query" type="text" class="form-control border-0" placeholder="Search for..." aria-label="Search" />
			<div class="input-group-append">
				<button @click="search" @keyup.enter="search" class="btn btn-primary-prime" type="button">
					<i class="fas fa-search fa-sm"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		name: "SearchTag",

		data() {
			return {
				query: "",
			};
		},
		watch: {
			query: {
				handler: _.debounce(function() {
					this.disTag(this.query);
				}, 1000),
			},
		},
		methods: {
			...mapActions("tag", ["disTag"]),
			search() {
				this.disTag(this.query);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn-primary-prime {
		background-color: #ff7799;
		color: #fff;
	}
	input {
		caret-color: #ff7799;
		font-size: 0.85rem;
		// height: auto;
		margin-top: 0.5rem;
		outline: 1px solid #ff7799;
	}
</style>
