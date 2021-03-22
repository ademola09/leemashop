<template>
	<div class="users">
		<div class="container h-100">
			<div class="intro shadow p-3 h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-md-6">
						<h3>Users Page</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.</p>
					</div>
					<div class="col-md-6">
						<img src="/img/users.svg" class="img-fluid" alt="Users" />
					</div>
				</div>
			</div>

			<hr />

			<div class="card shadow mb-4">
				<div class="card-header py-2 d-flex align-items-center justify-content-between">
					<h6 class="m-0 font-weight-bold"><i class="fas fa-users btn-primary-prime"></i> Users List</h6>
					<button type="button" @click="addModal" class="btn btn-bg btn-icon-split btn-sm">
						<span class="icon text-white-50">
							<i class="fa fa-plus-circle"></i>
						</span>
						<span class="text">Add User</span>
					</button>
				</div>
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-borderless table-hover table-striped" id="dataTabled" width="100%" cellspacing="0">
							<thead style="background-color: #ff7799">
								<tr>
									<th>SN</th>
									<th>Name</th>
									<th>Username</th>
									<th>Email</th>
									<th>Role</th>
									<th>Created At</th>
									<th>Updated At</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(user, index) in users.data" :key="index">
									<td>{{ ++index }}</td>
									<td>{{ user.name }}</td>
									<td>{{ user.username }}</td>
									<td>{{ user.email }}</td>
									<td><span v-if="user.role == 1">Admin</span><span v-else>Guest</span></td>
									<td>{{ user.created_at | formatDate }}</td>
									<td>{{ user.updated_at | formatDate }}</td>
									<td class="btn-group fs-12">
										<div class="dropdown no-arrow">
											<a
												href="#"
												role="button"
												:id="`dropdownMenuLink${++index}`"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
												class="dropdown-toggle"
												><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i
											></a>
											<div :aria-labelledby="`dropdownMenuLink${++index}`" class="dropdown-menu dropdown-menu-right shadow animated--fade-in">
												<div class="dropdown-header">User Action:</div>
												<a href="#" class="dropdown-item">
													<button
														type="button"
														@click="viewUser(user.id)"
														class="btn btn-primary w-100 justify-content-between border-0 btn-icon-split btn-sm"
														title="View"
													>
														<span class="icon text-white-50">
															<i class="fas fa-eye"></i>
														</span>
														<span class="text">View</span>
													</button></a
												>
												<a href="#" class="dropdown-item">
													<button
														type="button"
														@click="editModal(user)"
														class="btn btn-warning w-100 justify-content-between border-0 btn-icon-split btn-sm"
														title="Edit"
													>
														<span class="icon text-white-50">
															<i class="fas fa-edit"></i>
														</span>
														<span class="text">Edit</span>
													</button></a
												>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item">
													<button
														type="button"
														@click="deleteUser(user.id)"
														class="btn btn-bg w-100 justify-content-between border-0 btn-icon-split btn-sm"
														title="Delete"
													>
														<span class="icon text-white-50">
															<i class="fas fa-trash-alt"></i>
														</span>
														<span class="text">Delete</span>
													</button></a
												>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<pagination :data="users" @pagination-change-page="getPagination" :limit="1" align="center" size="small">
							<span slot="prev-nav">&lt; Prev</span>
							<span slot="next-nav">Next &gt;</span>
						</pagination>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="user" tabindex="-1" role="dialog" aria-labelledby="editProductLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editProductLabel" v-if="modal == 'new'"><i class="fa fa-plus-circle btn-primary-prime"></i> Create User</h5>
						<h5 class="modal-title" id="editProductLabel" v-else><i class="fa fa-edit text-warning"></i> Edit User</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row justify-content-center align-items-center">
							<form class="user">
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input
											type="text"
											v-model="userData.name"
											class="form-control form-control-user"
											id="exampleFirstName"
											placeholder="First Name"
										/>
										<small class="text-danger" v-if="errors.name">
											{{ errors.name[0] }}
										</small>
									</div>
									<div class="col-sm-6">
										<input
											type="text"
											v-model="userData.username"
											class="form-control form-control-user"
											id="exampleLastName"
											placeholder="Username"
										/>
										<small class="text-danger" v-if="errors.username">
											{{ errors.username[0] }}
										</small>
									</div>
								</div>
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input
											type="email"
											v-model="userData.email"
											class="form-control form-control-user"
											id="exampleInputEmail"
											placeholder="Email Address"
										/>
										<small class="text-danger" v-if="errors.email">
											{{ errors.email[0] }}
										</small>
									</div>
									<div class="col-sm-6">
										<select v-model="userData.role" class="form-control form-control-user" id="exampleRole" style="display:block !important">
											<option value="">--select--</option>
											<option value="1">Admin</option>
											<option value="2">User</option>
										</select>
										<small class="text-danger" v-if="errors.role">
											{{ errors.role[0] }}
										</small>
									</div>
								</div>
								<div class="form-group row">
									<div class="col-sm-6 mb-3 mb-sm-0">
										<input
											type="password"
											v-model="userData.password"
											class="form-control form-control-user"
											id="exampleInputPassword"
											placeholder="Password"
										/>
										<small class="text-danger" v-if="errors.password">
											{{ errors.password[0] }}
										</small>
									</div>
									<div class="col-sm-6">
										<input
											type="password"
											v-model="userData.password_confirmation"
											class="form-control form-control-user"
											id="exampleRepeatPassword"
											placeholder="Repeat Password"
										/>
										<small class="text-danger" v-if="errors.password_confirmation">
											{{ errors.name[0] }}
										</small>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer py-2">
							<button @click="createUser()" class="btn btn-sm btn-primary m-0" v-if="modal == 'new'">
								Add User
							</button>
							<button @click="editUser()" class="btn btn-sm btn-primary m-0" v-if="modal == 'edit'">
								Update User
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- User Details Modal-->
		<div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">User Details</h5>
						<button class="close" type="button" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card justify-content-center align-items-center">
							<div class="card-body">
								<div class="text-center mb-3">
									<h4 class="card-title">Name: {{ user.name }}</h4>
									<p class="card-subtitle">Username: {{ user.username }}</p>
									<p class="card-subtitle">Email: {{ user.email }}</p>
									<p class="card-subtitle" v-if="user.role == 1">Role: Administrator</p>
									<p class="card-subtitle" v-else>Role: Guest</p>
									<!-- <p class="card-text">Description: {{ user.bio }}</p> -->
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-sm btn-secondary" type="button" data-dismiss="modal">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapGetters, mapActions, mapState } from "vuex";
	export default {
		name: "Users",
		props: {
			msg: String,
		},

		data() {
			return {
				userData: {
					name: "",
					username: "",
					role: "",
					email: "",
					password: "",
					password_confirmation: "",
				},
				modal: "",
			};
		},

		computed: {
			...mapState({
				errors: (state) => state.auth.errors,
			}),

			...mapGetters("auth", ["users", "user"]),
		},

		methods: {
			...mapActions("auth", ["getUsers", "getUser", "storeUser", "updateUser", "deleteUser", "getPagination"]),

			createUser() {
				this.storeUser(this.userData);
				if ((this.errors = [])) {
					$("#user").modal("hide");
				}
			},

			editUser() {
				this.updateUser(this.userData);
				$("#user").modal("hide");
			},

			viewUser(uId) {
				this.getUser(uId);
				$("#viewModal").modal("show");
			},

			addModal() {
				this.modal = "new";
				this.reset();
				$("#user").modal("show");
			},

			editModal(user) {
				this.modal = "edit";
				this.reset();
				this.userData = user;
				$("#user").modal("show");
			},

			uploadImage: function(e) {
				let vm = this;
				vm.userData.images = [];
				for (let i = 0; i < e.target.files.length; i++) {
					let reader = new FileReader();
					reader.readAsDataURL(e.target.files[i]);

					reader.onload = (e) => {
						vm.userData.images.push(e.target.result);
					};
				}
			},

			removeImage(index) {
				this.userData.images.splice(index, 1);
			},

			reset() {
				this.userData = {
					name: "",
					username: "",
					role: "",
					email: "",
					password: "",
					password_confirmation: "",
				};
			},
		},

		mounted() {
			this.getUsers();
			this.getPagination();
		},
	};
</script>
<style scoped lang="scss">
	.fs-12 {
		font-size: 0.7rem;
	}
	.btn-primary-prime {
		color: #ff7799;
	}
	.btn-bg {
		background-color: #ff7799;
		color: #fff;
	}
	th {
		font-size: 0.7rem;
		color: #fff;
	}
	td {
		padding: 0.3rem !important;
		vertical-align: middle !important;
		font-size: 0.7rem;
	}
	form.user .form-control-user {
		padding: 0 1rem 0;
	}
	.dropdown-item {
		padding: 0.25rem 0.8rem;
	}
</style>
