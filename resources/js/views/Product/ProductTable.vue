<template>
	<div class="products">
		<div class="container h-100">
			<div class="intro shadow p-3 h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-md-6">
						<h3>Products Page</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.
						</p>
					</div>
					<div class="col-md-6">
						<img src="/img/factory.svg" class="img-fluid" alt="products" />
					</div>
				</div>
			</div>

			<hr />

			<div class="product-test shadow mb-4">
				<h3 class="d-inline-block ml-2"><i class="fas fa-list-alt text-primary"></i> Product List</h3>
				<button @click="addModal" class="btn btn-sm btn-primary float-right"><i class="fa fa-plus-circle"></i> Add Product</button>
				<div class="table-responsive">
					<table class="table table-borderless table-hover table-striped" id="dataTable" cellspacing="0">
						<thead class="bg-primary text-light">
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th class="text-center">Image</th>
								<th>Description</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Tags</th>
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
								<th>Description</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Tags</th>
								<th>Created At</th>
								<th>Updated At</th>
								<th>Action</th>
							</tr>
						</tfoot>
						<tbody>
							<tr v-for="(product, index) in products.data" :key="index" class="animated fadeInUp">
								<td class="fs-12">{{ ++index }}</td>
								<td class="fs-12 text-capitalize">{{ product.name }}</td>
								<td class="text-center fs-12 align-middle">
									<span v-for="(product_img, index) in product.product_images" :key="index">
										<img
											:src="`/storage/uploads/product_images/${product_img.product_image}`"
											alt="LeemaShop"
											class="rounded-circle"
											style="width: 30px; height: 30px"
										/>
									</span>
								</td>
								<td class="fs-12" v-if="product.description.length > 50">
									{{ product.description.substring(0, 50) + "..." }}
								</td>
								<td class="fs-12 text-capitalize" v-else>
									{{ product.description }}
								</td>
								<td class="fs-12">{{ product.price }}</td>
								<td class="fs-12">{{ product.stock }}</td>
								<td>
									<span class="btn btn-sm btn-info p-1 mr-1" v-for="(tag, index) in product.tags" :key="index">
										<i class="fas fa-tag"></i>
										{{ tag.name }}</span>
								</td>
								<td class="fs-12">{{ product.created_at | formatDate }}</td>
								<td class="fs-12">{{ product.updated_at | formatDate }}</td>
								<td class="btn-group">
									<button @click="viewProduct(product.id)" class="btn btn-primary fs-12 border-0" title="View">
										<i class="fas fa-eye fs-12"></i>
									</button>
									<button @click="editModal(product)" class="btn btn-warning fs-12 border-0" title="Edit">
										<i class="fas fa-edit fs-12"></i>
									</button>
									<button @click="deleteProduct(product.id)" class="btn btn-bg fs-12 border-0" title="Delete">
										<i class="fas fa-trash-alt fs-12"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<pagination :data="products" @pagination-change-page="getPagination" :limit="5" align="center" size="small">
						<span slot="prev-nav">&lt; Previous</span>
						<span slot="next-nav">Next &gt;</span>
					</pagination>
				</div>
			</div>
		</div>

		<!-- Edit Modal -->
		<!-- <AddEdit /> -->
		<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editProductLabel" aria-hidden="true">
			<div class="modal-dialog modal-xl" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editProductLabel" v-if="modal == 'new'"><i class="fa fa-plus-circle text-primary"></i> Add Product</h5>
						<h5 class="modal-title" id="editProductLabel" v-else><i class="fa fa-edit text-warning"></i> Edit Product</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-8">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<select v-model="productData.category_id" class="form-control d-block text-capitalize" @change="selectCat">
												<option value="" disabled selected="selected">
													Select Product Category
												</option>
												<option :value="category.id" v-for="(category, index) in categories.data" :key="index">
													{{ category.name }}
												</option>
											</select>
										</div>
										<div class="form-group">
											<select
												class="form-control d-block text-capitalize"
												v-model="productData.category_id"
												@change="selectSubCat"
												v-if="singleCategory.child_categories"
											>
												<option value="" disabled selected="selected">
													Select Sub Category
												</option>
												<option v-for="(cat, index) in singleCategory.child_categories" :value="cat.id" :key="index"> &nbsp;-&nbsp;{{ cat.name }} </option>
											</select>
										</div>
										<div class="form-group">
											<input type="text" v-model="productData.name" class="form-control" placeholder="Product Name" />
										</div>
										<div class="form-group">
											<input type="text" v-model="productData.title" class="form-control" placeholder="Product Title" />
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<div class="form-group">
												<textarea id="" class="form-control" v-model="productData.description" rows="6" placeholder="Product Description"></textarea>
												<!-- <vue-editor v-model="productData.description" cols="30" rows="7" placeholder="Product Description"></vue-editor> -->
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<h4 class="display-6">Product Details</h4>
								<hr />
								<div class="form-group d-inline-flex mb-0">
									<div class="form-group">
										<!-- <label for="price" class="form-check-label">Price</label> -->
										<input v-model="productData.price" class="form-control" type="number" id="price" placeholder="Price" />
									</div>

									<div class="form-group ml-4">
										<!-- <label for="stock" class="form-check-label">Stock</label> -->
										<input v-model="productData.stock" class="form-control" type="number" id="stock" placeholder="Stock" />
									</div>
								</div>
								<div class="form-group mb-2">
									<label class="typo__label">Tagging</label>
									<multiselect
										v-model="productData.tags"
										tag-placeholder="Add this as new tag"
										placeholder="Search or add a tag"
										label="name"
										track-by="name"
										:options="tags.data"
										:multiple="true"
										:taggable="true"
										@tag="addTag"
									></multiselect>
									<!-- <pre class="tag_id-json"><code>{{ productData.tags  }}</code></pre> -->
								</div>
								<div class="form-group">
									<label for="product_image">Product Image</label>
									<input type="file" @change="uploadImage" class="btn btn-primary w-100" id="product_image" multiple />
								</div>
								<div class="form-group d-flex">
									<div class="p-1 h-auto" v-for="(image, index) in productData.images" :key="index">
										<div class="img-wrap">
											<img :src="image" class="img-thumbnail h-100" alt="Uploads" width="80px" />
											<span @click="removeImage(index)" class="badge badge-danger delete-img animated pulse infinite">X</span>
										</div>
									</div>
									<div class="justify-content-between">
										<img
											v-for="(image, index) in productData['product_images']"
											:key="index"
											:src="`/storage/uploads/product_images/${image.product_image}`"
											alt="LeemaShop"
											class="rounded-circle mr-2 animated pulse infinite"
											style="width: 30px; height: 30px"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button @click="addToProduct()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'new'">
								Add Product
							</button>
							<button @click="editProduct()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'edit'">
								Update Product
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Product Details Modal-->
		<!-- <ProductDetails :singleProduct="singleProduct" /> -->
		<div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewProductModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="viewProductModalLabel">Product Details</h5>
						<button class="close" type="button" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card align-items-center">
							<div class="justify-content-between">
								<img
									v-for="(image, index) in singleProduct.product_images"
									:key="index"
									:src="`/storage/uploads/product_images/${image.product_image}`"
									alt="LeemaShop"
									class="rounded-circle m-3 animated pulse infinite"
									style="width: 40px; height: 40px"
								/>
							</div>
							<div class="card-body">
								<div class="text-center mb-3">
									<h4 class="card-title">Name: {{ singleProduct.name }}</h4>
									<p class="card-subtitle">Title: {{ singleProduct.title }}</p>
									<p class="card-text">Description: {{ singleProduct.description }}</p>
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
	import { mapGetters, mapActions } from "vuex";
	// import AddEdit from "./Modal/AddEdit";
	// import ProductDetails from "./Modal/ProductDetails";
	// import Tags from '../Admin/Tags'
	import Multiselect from "vue-multiselect";
	export default {
		name: "Products",
		components: { Multiselect },

		data() {
			return {
				productData: {
					name: "",
					title: "",
					description: "",
					price: "",
					stock: "",
					images: [],
					slug: "",
					tags: [],
					category_id: "",
				},
				modal: "",
				selectedCat: "",
				// options: [],
			};
		},

		computed: {
			...mapGetters({
				products: "product/products",
				singleProduct: "product/product",
				categories: "category/categories",
				singleCategory: "category/singleCategory",
				tags: "tag/tags",
			}),
		},

		methods: {
			...mapActions("product", [
				"getProducts",
				"getProduct",
				"deleteProduct",
				"getPagination",
				"addProduct",
				"updateProduct",
				"removeImage",
			]),
			...mapActions("category", ["getCategories", "getCategory", "selectSubCat"]),
			addModal() {
				this.modal = "new";
				this.reset();
				$("#product").modal("show");
			},

			editModal(product) {
				this.modal = "edit";
				this.reset();
				this.productData = product;
				$("#product").modal("show");
			},

			editProduct() {
				this.updateProduct(this.productData);
				if (this.getProducts()) {
					$("#product").modal("hide");
				}
			},

			viewProduct(pId) {
				this.getProduct(pId);
				$("#viewModal").modal("show");
			},

			uploadImage: function(e) {
				let vm = this;
				vm.productData.images = [];
				for (let i = 0; i < e.target.files.length; i++) {
					let reader = new FileReader();
					reader.readAsDataURL(e.target.files[i]);
					let type = e.target.files[i].type;
					let name = e.target.files[i].name;
					reader.onload = (e) => {
						vm.productData.images.push(e.target.result);
					};
				}
			},

			removeImage(index) {
				this.productData.images.splice(index, 1);
			},

			addTag(newTag) {
				const tag = {
					name: newTag,
					// tag_id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
				};
				this.productData.tags.push(tag);
				// this.options.push(tag);
			},

			selectCat: function() {
				this.selectedCat = "";
			},

			selectCat() {
				this.getCategory(this.productData.category_id);
			},

			addToProduct() {
				this.addProduct(this.productData);
				if (this.getProducts()) {
					$("#product").modal("hide");
					this.reset();
				}
			},

			reset() {
				this.productData = {
					name: "",
					title: "",
					description: "",
					price: "",
					stock: "",
					images: [],
					slug: "",
					tags: [],
					category_id: "",
				};
			},
		},

		beforeMount() {
			this.getPagination();
			this.getProducts();
			this.getCategories();
		},
	};
</script>

<style lang="scss" scoped>
	.fs-12 {
		font-size: 0.7rem;
	}
	select.fix-height {
		height: 100px;
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
