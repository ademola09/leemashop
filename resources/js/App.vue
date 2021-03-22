<template>
	<div>
		<router-view></router-view>
		<NotificationsList />
	</div>
</template>

<script>
	import NotificationsList from "./components/NotificationsList";
	export default {
		name: "App",
		components: { NotificationsList },
	};
</script>

<style lang="scss" scoped></style>
