<template>
	<div class="bg-gradient-primary">
		<div class="container">
			<!-- Outer Row -->
			<div class="row align-items-center justify-content-center">
				<div class="col-xl-10 col-lg-12 col-md-9">
					<div class="card o-hidden border-0 shadow-lg my-5">
						<div class="card-body p-0">
							<!-- Nested Row within Card Body -->
							<div class="row">
								<div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
								<div class="col-lg-6">
									<div class="p-5">
										<div class="text-center">
											<h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
										</div>
										<form class="user">
											<div class="form-group">
												<input
													type="email"
													v-model="form.email"
													class="form-control form-control-user"
													id="exampleInputEmail"
													aria-describedby="emailHelp"
													placeholder="Enter Email Address..."
												/>
												<span class="text-danger" v-if="errors.email">
													{{ errors.email[0] }}
												</span>
											</div>
											<div class="form-group">
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
											<div class="form-group">
												<div class="custom-control custom-checkbox small">
													<input type="checkbox" class="custom-control-input" id="customCheck" />
													<label class="custom-control-label" for="customCheck">Remember Me</label>
												</div>
											</div>
											<button :disabled="form.busy" @click.prevent="login" class="btn btn-primary btn-user btn-block">
												Login
											</button>
										</form>
										<hr />
										<div class="text-center">
											<router-link class="small" to="forgot-password">Forgot Password?</router-link>
										</div>
										<div class="text-center">
											<router-link class="small" to="/register">Create an Account!</router-link>
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
		name: "Login",
		data() {
			return {
				form: {
					email: "",
					password: "",
				},
			};
		},

		computed: {
			...mapState({
				errors: (state) => state.auth.errors,
			}),
		},

		methods: {
			...mapActions("auth", ["loginUser"]),

			login() {
				this.loginUser(this.form);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bg-gradient-primary {
		height: 100vh;
	}
	.bg-login-image {
		background: url("/img/login.svg");
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
