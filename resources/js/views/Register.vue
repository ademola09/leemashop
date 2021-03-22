<template>
	<div class="bg-gradient-primary">
		<div class="container">
			<!-- Outer Row -->
			<div class="row align-items-center justify-content-center">
				<div class="col-xl-12 col-lg-12 col-md-9">
					<div class="card o-hidden border-0 shadow-lg my-5">
						<div class="card-body p-0">
							<!-- Nested Row within Card Body -->
							<div class="row">
								<div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
								<div class="col-lg-7">
									<div class="p-5">
										<div class="text-center">
											<h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
										</div>
										<form class="user">
											<div class="form-group row">
												<div class="col-sm-6 mb-3 mb-sm-0">
													<input
														type="text"
														v-model="form.name"
														class="form-control form-control-user"
														id="exampleFirstName"
														placeholder="First Name"
													/>
													<span class="text-danger" v-if="errors.name">
														{{ errors.name[0] }}
													</span>
												</div>
												<div class="col-sm-6">
													<input
														type="text"
														v-model="form.username"
														class="form-control form-control-user"
														id="exampleLastName"
														placeholder="Username"
													/>
													<span class="text-danger" v-if="errors.username">
														{{ errors.username[0] }}
													</span>
												</div>
											</div>
											<div class="form-group row">
												<div class="col-sm-12 mb-3 mb-sm-0">
													<input
														type="email"
														v-model="form.email"
														class="form-control form-control-user"
														id="exampleInputEmail"
														placeholder="Email Address"
													/>
													<span class="text-danger" v-if="errors.email">
														{{ errors.email[0] }}
													</span>
												</div>
											</div>
											<div class="form-group row">
												<div class="col-sm-6 mb-3 mb-sm-0">
													<input
														type="password"
														v-model="form.password"
														class="form-control form-control-user"
														id="exampleInputPassword"
														placeholder="Password"
													/>
													<span class="text-danger" v-if="errors.password">
														{{ errors.password[0] }}
													</span>
												</div>
												<div class="col-sm-6">
													<input
														type="password"
														v-model="form.password_confirmation"
														class="form-control form-control-user"
														id="exampleRepeatPassword"
														placeholder="Repeat Password"
													/>
													<span class="text-danger" v-if="errors.password_confirmation">
														{{ errors.name[0] }}
													</span>
												</div>
											</div>
											<button @click.prevent="register()" class="btn btn-primary btn-user btn-block">
												Register Account
											</button>
										</form>
										<hr />
										<div class="text-center">
											<router-link class="small" to="forgot-password">Forgot Password?</router-link>
										</div>
										<div class="text-center">
											<router-link class="small" to="/login">Already have an account? Login!</router-link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";

	export default {
		name: "Register",
		data() {
			return {
				form: {
					name: "",
					username: "",
					email: "",
					password: "",
					password_confirmation: "",
				},
			};
		},

		computed: {
			...mapState({
				errors: (state) => state.auth.errors,
			}),
		},

		methods: {
			...mapActions("auth", ["addUser"]),
			register() {
				this.addUser(this.form);
			},
		},

		reset() {
			this.form = {
				name: "",
				username: "",
				email: "",
				password: "",
				password_confirmation: "",
			};
		},
	};
</script>

<style lang="scss" scoped>
.bg-gradient-primary {
		height: 100vh;
	}
	.bg-register-image {
		background: url("/img/register.svg");
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
	.btn-google {
		color: #fff;
		background-color: #ea4335;
		border-color: #fff;
	}
	.btn-facebook {
		color: #fff;
		background-color: #3b5998;
		border-color: #fff;
	}
</style>
