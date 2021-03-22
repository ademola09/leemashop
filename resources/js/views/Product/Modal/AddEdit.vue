<template>
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
											<option :value="category.id" v-for="category in categories.data" :key="category.id">
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
											<option v-for="cat in singleCategory.child_categories" :value="cat.id" :key="cat.id"> &nbsp;-&nbsp;{{ cat.name }} </option>
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
									track-by="id"
									:options="tags"
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
										v-for="image in productData['product_images']"
										:key="image.id"
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
</template>

<script>
	export default {
		name: "AddEdit",

	};
</script>

<style lang="scss" scoped></style>
