<template>
	<div class="categories">
		<div class="container h-100">
			<div class="intro shadow p-3 h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-md-6">
						<h3>Category Page</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.
						</p>
					</div>
					<div class="col-md-6">
						<img src="/img/organizer.svg" class="img-fluid" alt="category" />
					</div>
				</div>
			</div>

			<hr />

			<div class="product-test shadow mb-4">
				<h3 class="d-inline-block ml-2"><i class="fas fa-list-alt btn-primary-prime"></i> Category List</h3>
				<button @click="addModal" class="btn btn-sm btn-bg float-right"><i class="fa fa-plus-circle"></i> Add Category</button>

				<div class="table-responsive">
					<table class="table table-borderless table-hover table-striped" id="dataTable" width="100%" cellspacing="0">
						<thead class="" style="background-color: #ff7799">
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th class="text-center">Image</th>
								<!-- <th>Title</th> -->
								<!-- <th>Description</th> -->
								<th>Featured</th>
								<th>Menu</th>
								<!-- <th>Parent Category</th> -->
								<th>Created At</th>
								<th>Updated At</th>
								<th>Action</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th class="text-center">Image</th>
								<!-- <th>Title</th> -->
								<!-- <th>Description</th> -->
								<th>Featured</th>
								<th>Menu</th>
								<!-- <th>Parent Category</th> -->
								<th>Created At</th>
								<th>Updated At</th>
								<th>Action</th>
							</tr>
						</tfoot>
						<tbody class="text-capitalize">
							<tr v-for="(category, index) in categories.data" :key="category.id" class="animated fadeInUp">
								<td class="fs-12">{{ ++index }}</td>
								<td class="fs-12">{{ category.name }}</td>
								<td class="text-center fs-12 align-middle">
									<img
										:src="`/storage/uploads/category_images/${category.image}`"
										alt="LeemaShop"
										class="img-fluid rounded-circle"
										style="width: 30px; height: 30px"
									/>
								</td>
								<!-- <td class="fs-12">{{ category.title }}</td> -->
								<!-- <td class="fs-12" v-if="category.description.length > 60">{{ category.description.substring(0, 60) + "..." }}</td> -->
								<!-- <td class="fs-12" v-else>{{ category.description }}</td> -->
								<!-- <td class="fs-12">{{ category.description }}</td> -->
								<td class="fs-12" title="To show featured category on homepage">
									{{ category.featured }}
								</td>
								<td class="fs-12" title="To show or hide category in the main menu navigation">
									{{ category.menu }}
								</td>
								<!-- <td class="fs-12">{{ category.category_id != null ? category.name : "" }}</td> -->
								<td class="fs-12">{{ category.created_at | formatDate }}</td>
								<td class="fs-12">{{ category.updated_at | formatDate }}</td>
								<td class="btn-group fs-12">
									<button @click="viewCategory(category.id)" class="btn btn-primary border-0" title="View">
										<i class="fas fa-eye fs-12"></i>
									</button>
									<button @click="editModal(category)" class="btn btn-warning border-0" title="Edit">
										<i class="fas fa-edit fs-12"></i>
									</button>
									<button @click="deleteCategory(category.id)" class="btn btn-bg border-0" title="Delete">
										<i class="fas fa-trash-alt fs-12"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<pagination :data="categories" @pagination-change-page="getPagination" :limit="1" align="center" size="small">
						<span slot="prev-nav">&lt; Previous</span>
						<span slot="next-nav">Next &gt;</span>
					</pagination>
				</div>
			</div>
		</div>

		<!-- Edit Modal -->
		<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="editProductLabel" aria-hidden="true">
			<div class="modal-dialog modal-xl" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editProductLabel" v-if="modal == 'new'">
							<i class="fa fa-plus-circle btn-primary-prime"></i> Create Category
						</h5>
						<h5 class="modal-title" id="editProductLabel" v-else><i class="fa fa-edit text-warning"></i> Edit Category</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-8">
								<div class="row">
									<div class="form-group col-md-3 pr-0">
										<input type="text" v-model="categoryData.name" class="form-control" placeholder="Category Name" />
									</div>
									<div class="form-group col-md-3 pr-0">
										<input type="text" v-model="categoryData.title" class="form-control" placeholder="Category Title" />
									</div>
									<div class="form-group col-md-3 pr-0">
										<select class="form-control d-block text-capitalize" v-model="categoryData.category_id" @change="selectCat">
											<option value="" disabled selected="selected">
												Select Main Category
											</option>
											<option v-for="category in categories.data" :label="category.name" :value="category.id" :key="category.id">
												{{ category.name }}
											</option>
										</select>
									</div>
									<div class="form-group col-md-3">
										<select
											class="form-control d-block text-capitalize"
											v-model="categoryData.category_id"
											@change="selectSubCat"
											v-if="singleCategory.child_categories"
										>
											<option value="" disabled selected="selected">
												Select Sub Category
											</option>
											<option v-for="cat in singleCategory.child_categories" :value="cat.id" :key="cat.id"> &nbsp;-&nbsp;{{ cat.name }} </option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<textarea id="" class="form-control" v-model="categoryData.description" rows="5" placeholder="Category Description"></textarea>
									<!-- <vue-editor v-model="categoryData.description" cols="30" rows="7" placeholder="Category Description"></vue-editor> -->
								</div>
							</div>
							<div class="col-md-4">
								<h4 class="display-6">Category Details</h4>
								<hr />
								<div class="form-group d-inline-flex">
									<div class="form-group">
										<input v-model="categoryData.featured" class="form-check-input" type="checkbox" id="featured" />
										<label for="featured" class="form-check-label">Featured</label>
									</div>

									<div class="form-group ml-4">
										<input v-model="categoryData.menu" class="form-check-input" type="checkbox" id="menu" />
										<label for="menu" class="form-check-label">Menu</label>
									</div>
								</div>
								<!-- <div class="form-group">
									<input type="text" @keyup.188="addTag" v-model="tag" class="form-control" placeholder="Product Tags" />
									<div class="d-flex">
										<p v-for="tag in product.tags" :key="tag.id">
											<span class="p-1">{{ tag }}</span>
										</p>
									</div>
								</div> -->
								<div class="form-group">
									<label for="category_image">Category Image</label>
									<input type="file" @change="uploadImage" class="btn btn-primary w-100" id="category_image" multiple />
								</div>
								<div class="form-group ">
									<div class="p-1 h-auto" v-for="(image, index) in categoryData.images" :key="index">
										<div class="img-wrap">
											<img :src="image" class="img-thumbnail h-100" alt="Uploads" width="80px" />
											<span @click="removeImage(index)" class="badge badge-danger delete-img animated pulse infinite">X</span>
										</div>
									</div>
								</div>
								<div v-if="modal == 'edit'" class="justify-content-center align-items-center">
									<img
										:src="`/storage/uploads/category_images/${categoryData.image}`"
										alt="LeemaShop"
										class="img-thumbnail h-100 mb-2"
										width="80px"
									/>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button @click="addToCategory()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'new'">
								Add Category
							</button>
							<button @click="editCategory()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'edit'">
								Update Category
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Category Details Modal-->
		<div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Category Details</h5>
						<button class="close" type="button" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card justify-content-center align-items-center">
							<img :src="`/storage/uploads/category_images/${singleCategory.image}`" alt="LeemaShop" class="img-fluid mt-3" width="100" />
							<div class="card-body">
								<div class="text-center mb-3">
									<h4 class="card-title">Name: {{ singleCategory.name }}</h4>
									<p class="card-subtitle">Title: {{ singleCategory.title }}</p>
									<p class="card-text">Description: {{ singleCategory.description }}</p>
								</div>

								<h5>Sub Categories</h5>
								<li v-for="subCat in singleCategory.child_categories" :key="subCat.id" class="ml-2 text-capitalize">
									{{ subCat.name }}
								</li>
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
	import { mapGetters, mapActions } from "vuex";
	export default {
		name: "Categories",

		data() {
			return {
				categoryData: {
					category_id: "",
					name: "",
					title: "",
					description: "",
					featured: "",
					menu: "",
					images: [],
					slug: "",
				},
				modal: "",
				selectedCat: "",
				options: [],
			};
		},

		computed: {
			...mapGetters({
				categories: "category/categories",
				singleCategory: "category/singleCategory",
			}),
		},

		methods: {
			...mapActions("category", ["getCategories", "getCategory", "addCategory", "updateCategory", "deleteCategory", "getPagination", "selectSubCat"]),

			uploadImage: function(e) {
				let vm = this;
				// clear the images
				vm.categoryData.images = [];
				for (let i = 0; i < e.target.files.length; i++) {
					let reader = new FileReader();
					reader.readAsDataURL(e.target.files[i]);

					let type = e.target.files[i].type;
					let name = e.target.files[i].name;
					reader.onload = (e) => {
						vm.categoryData.images.push(e.target.result);
					};
				}
			},

			removeImage(index) {
				this.categoryData.images.splice(index, 1);
			},

			selectCat: function() {
				this.selectedCat = "";
			},

			viewCategory(cId) {
				this.getCategory(cId);
				$("#viewModal").modal("show");
			},

			selectCat() {
				this.getCategory(this.categoryData.category_id);
			},

			addToCategory() {
				this.addCategory(this.categoryData);
				$("#category").modal("hide");
			},

			editCategory() {
				this.updateCategory(this.categoryData);
				$("#category").modal("hide");
			},

			reset() {
				this.categoryData = {
					category_id: "",
					name: "",
					title: "",
					description: "",
					featured: "",
					menu: "",
					images: [],
				};
			},

			addModal() {
				this.modal = "new";
				this.reset();
				$("#category").modal("show");
			},

			editModal(category) {
				this.modal = "edit";
				this.reset();
				this.categoryData = category;
				$("#category").modal("show");
			},
		},

		beforeMount() {
			this.getCategories();
			this.getPagination();
		},
	};
</script>

<style lang="scss" scoped>
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
	td {
		padding: 0.3rem !important;
		vertical-align: middle !important;
	}
</style>
