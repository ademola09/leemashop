<template>
	<div class="notofication-list">
		<NotificationMessage v-for="notification in notifications" :key="notification.id" :notification="notification" />
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import NotificationMessage from "./NotificationMessage";
	export default {
		components: {
			NotificationMessage,
		},
		computed: mapState(["notifications"]),
	};
</script>

<style lang="scss" scoped>
	.notofication-list {
		position: fixed;
		bottom: 0;
		right: 0;
		margin-right: 15px;
		width: 400px;
	}
</style>
