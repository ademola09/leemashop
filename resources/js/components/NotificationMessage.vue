<template>
  <div class="alert alert-dismissible fade show" :class="typeClass" role="alert">
    <h4 class="alert-header">
      <strong class="mr-auto" v-if="notification.type == 'danger'"><i class="fas fa-exclamation-triangle"></i> Error!</strong>
      <strong class="mr-auto" v-else><i class="fas fa-check"></i> Success!</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </h4>
		<hr/>
    <div class="toast-body">
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		props: ["notification"],

		data() {
			return {
				timeout: null,
			};
		},

		computed: {
			typeClass() {
				return `alert-${this.notification.type}`;
			},
		},

		created() {
			this.timeout = setTimeout(() => {
				this.removeNotification(this.notification);
			}, 5000);
		},

		beforeDestroy() {
			clearTimeout(this.timeout);
		},

		methods: mapActions(["removeNotification"]),
	};
</script>

<style lang="scss" scoped></style>
