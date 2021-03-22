<template>
	<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
		<!-- Sidebar - Brand -->
		<router-link class="sidebar-brand d-flex align-items-center justify-content-center" :to="{ name: 'Home' }" exact>
			<div class="sidebar-brand-icon">
				<img class="img-fluid rounded-circle w-50" src="/img/logo2.jpeg" />
			</div>
			<div class="sidebar-brand-text mx-3">Leema's Shop</div>
		</router-link>

		<!-- Divider -->
		<hr class="sidebar-divider my-0" />

		<!-- Nav Item - Dashboard -->
		<li class="nav-item">
			<router-link class="nav-link" :to="{ name: 'admin.dashboard' }" exact>
				<i class="fas fa-fw fa-tachometer-alt"></i>
				<span>Dashboard</span>
			</router-link>
		</li>

		<!-- Divider -->
		<hr class="sidebar-divider" />

		<!-- Heading -->
		<div class="sidebar-heading">
			Interface
		</div>

		<!-- Nav Item - Pages Collapse Menu -->
		<li class="nav-item active">
			<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
				<!-- <i class="fas fa-fw fa-cogs"></i> -->
				<i class="fas fa-fw fa-layer-group"></i>
				<span>Categories</span>
			</a>
			<div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Category Management:</h6>
					<router-link class="collapse-item" :to="{ name: 'admin.categories' }" exact>Categories</router-link>
					<router-link class="collapse-item" :to="{ name: 'admin.orders' }" exact>Order</router-link>
				</div>
			</div>
		</li>

		<li class="nav-item">
			<a
				class="nav-link collapsed"
				href="#"
				data-toggle="collapse"
				data-target="#collapseProduct"
				aria-expanded="true"
				aria-controls="collapseProduct"
			>
				<i class="fas fa-fw fa-tasks"></i>
				<span>Products</span>
			</a>
			<div id="collapseProduct" class="collapse" aria-labelledby="headingProduct" data-parent="#accordionSidebar">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Product Management:</h6>
					<router-link class="collapse-item" :to="{ name: 'admin.products' }" exact>Products</router-link>
					<router-link class="collapse-item" :to="{ name: 'products.tags' }" exact>Tags</router-link>
					<!-- <router-link class="collapse-item" :to="{ name: 'products.images' }" exact>Product Images</router-link> -->
				</div>
			</div>
		</li>

		<!-- Nav Item - Utilities Collapse Menu -->
		<li class="nav-item">
			<a
				class="nav-link collapsed"
				href="#"
				data-toggle="collapse"
				data-target="#collapseUtilities"
				aria-expanded="true"
				aria-controls="collapseUtilities"
			>
				<i class="fas fa-fw fa-wrench"></i>
				<span>Utilities</span>
			</a>
			<div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Custom Utilities:</h6>
					<a class="collapse-item" href="utilities-color.html">Colors</a>
					<a class="collapse-item" href="utilities-border.html">Borders</a>
					<a class="collapse-item" href="utilities-animation.html">Animations</a>
					<a class="collapse-item" href="utilities-other.html">Other</a>
				</div>
			</div>
		</li>

		<!-- Divider -->
		<hr class="sidebar-divider" />

		<!-- Heading -->
		<div class="sidebar-heading">
			Addons
		</div>

		<!-- Nav Item - Pages Collapse Menu -->
		<li class="nav-item">
			<a class="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
				<i class="fas fa-fw fa-folder"></i>
				<span>Management</span>
			</a>
			<div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">User Screens:</h6>
					<router-link class="collapse-item" :to="{ name: 'admin.users' }" exact>Users</router-link>
					<div class="collapse-divider"></div>
					<h6 class="collapse-header">Other Pages:</h6>
					<!-- <router-link class="collapse-item" :to="{ name: 'admin.users' }" exact>Users</router-link> -->
				</div>
			</div>
		</li>

		<!-- Nav Item - Charts -->
		<li class="nav-item">
			<router-link class="nav-link" :to="{ name: 'admin.profile' }">
				<i class="fas fa-fw fa-user-alt"></i>
				<span>Profile</span>
			</router-link>
		</li>

		<!-- Nav Item - Tables -->
		<li class="nav-item">
			<a class="nav-link" href="tables.html">
				<i class="fas fa-fw fa-table"></i>
				<span>Tables</span></a
			>
		</li>

		<!-- Divider -->
		<hr class="sidebar-divider d-none d-md-block" />

		<!-- Sidebar Toggler (Sidebar) -->
		<div class="text-center d-none d-md-inline">
			<button class="rounded-circle border-0" id="sidebarToggle"></button>
		</div>
	</ul>
</template>

<script>
	export default {
		name: "Sidebar",
	};
</script>

<style lang="scss" scoped>
	.router-link-exact-active {
		// color: #ff7799;
		// background-color: #000;
		background-color: #ff7799;
		color: #fff !important;
	}
</style>
