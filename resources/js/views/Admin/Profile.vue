<template>
	<div class="profile">
		<div class="container h-100">
			<div class="intro shadow p-3 h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-md-6">
						<h3>Profile Settings</h3>
						<p>Change your profile settings here.</p>
					</div>
					<div class="col-md-6">
						<img src="/img/account.svg" class="img-fluid" alt="Profile" />
					</div>
				</div>
			</div>

			<hr />

			<div class="profile-test shadow mb-4">
				<div class="d-inline-block ml-2">
					<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
						<li class="nav-item">
							<a
								class="nav-link active"
								id="pills-profile-tab"
								data-toggle="pill"
								href="#pills-profile"
								role="tab"
								aria-controls="pills-profile"
								aria-selected="true"
								>Profile</a
							>
						</li>
						<li class="nav-item">
							<a
								class="nav-link"
								id="pills-account-tab"
								data-toggle="pill"
								href="#pills-account"
								role="tab"
								aria-controls="pills-account"
								aria-selected="false"
								>Account Setting</a
							>
						</li>
					</ul>
				</div>

				<div class="tab-content" id="pills-tabContent">
					<div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
						<div class="row">
							<div class="form-group col-md-6">
								<input type="text" v-model="profile.name" class="form-control" placeholder="Full Name" />
							</div>
							<div class="form-group col-md-6">
								<input type="text" v-model="profile.phone" class="form-control" placeholder="Phone Number" />
							</div>
							<div class="form-group col-md-12">
								<input type="text" v-model="profile.address" class="form-control" placeholder="Address" />
							</div>
							<div class="form-group col-md-8">
								<input type="text" v-model="profile.postcode" class="form-control" placeholder="Postal Code" />
							</div>
							<div class="form-group col-md-4">
								<input type="file" class="btn btn-sm btn-primary m-0 p-2" />
								<!-- <input type="submit" @click="updateProfile" class="btn btn-primary w-100" value="Save Changes" /> -->
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="pills-account" role="tabpanel" aria-labelledby="pills-account-tab">
						<div class="row">
							<div class="form-group col-md-6">
								<input type="text" v-model="account.name" class="form-control" placeholder="User Name" />
							</div>
							<div class="form-group col-md-6">
								<input type="email" v-model="account.email" class="form-control" placeholder="Email Address" />
							</div>
							<div class="form-group col-md-6">
								<input type="password" v-model="account.password" class="form-control" placeholder="New Password" />
							</div>
							<div class="form-group col-md-6">
								<input type="password" v-model="account.confirmPassword" class="form-control" placeholder="Confirm Password" />
							</div>
							<div class="form-group col-md-6">
								<textarea name="" id="" class="form-control" rows="10"></textarea>
								<!-- <input type="file" @change="uploadImage" class="form-control" /> -->
							</div>
							<div class="form-group col-md-3">
								<button type="button" class="btn btn-primary w-100">Save Changes</button>
							</div>
							<div class="form-group col-md-3">
								<button type="button" class="btn btn-success w-100">Reset password email</button>
								<!-- <button type="button" @click="resetPassword" class="btn btn-success w-100">Reset password email</button> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Profile",
		// props: {
		//   msg: String
		// },
		data() {
			return {
				profile: {
					name: null,
					phone: null,
					address: null,
					postcode: null,
				},
				account: {
					name: null,
					email: null,
					photoUrl: null,
					emailVerified: null,
					password: null,
					confirmPassword: null,
					uid: null,
				},
			};
		},
		// firestore() {
		//   const user = fb.auth().currentUser;
		//   return {
		//     profile: db.collection("profiles").doc(user.uid)
		//   };
		// },
		methods: {
			//   resetPassword() {
			//     const auth = fb.auth();
			//     auth
			//       .sendPasswordResetEmail(auth.currentUser.email)
			//       .then(() => {
			//         Toast.fire({
			//           icon: "success",
			//           title: "Password reset Sent Successfully! Please, check your email for confirmation."
			//         });
			//         console.log("Email Sent Successfully!");
			//       })
			//       .catch((error) => {
			//         console.log(error);
			//       });
		},
		//   updateProfile() {
		//     this.$firestore.profile.update(this.profile);
		//   },
		//   uploadImage() {}
		// }
	};
</script>
<style scoped lang="scss"></style>
