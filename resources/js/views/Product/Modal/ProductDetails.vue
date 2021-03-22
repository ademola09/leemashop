<template>
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
								v-for="image in singleProduct.product_images"
								:key="image.id"
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
</template>

<script>
	export default {
		name: "ProductDetails",
		props: ["singleProduct"],
	};
</script>

<style lang="scss" scoped></style>
