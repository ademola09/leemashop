<template>
	<div class="orders container h-100">
		<div class="card hoverable p-3 h-100">
			<div class="row h-100 justify-content-center align-items-center">
				<div class="col-md-6">
					<h3>Product Images's Page</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.
					</p>
				</div>
				<div class="col-md-6">
					<img src="/img/photo_album.svg" class="img-fluid" width="400px" alt="orders" />
				</div>
			</div>
		</div>

		<hr />

		<div class="card hoverable d-flex align-items-center text-center text-capitalize p-3">
			<div
				class="view zoom overlay z-depth-1 rounded mr-2 mb-md-0"
				style="width:150px !important"
				v-for="(productImage, index) in products.data"
				:key="index"
			>
				<img :src="`/storage/uploads/product_images/${productImage.image}`" :alt="productImage.name" class="img-fluid" />
				<div class="mask">
					<img :src="`/storage/uploads/product_images/${productImage.image}`" :alt="productImage.name" class="img-fluid" />
					<div class="mask rgba-black-slight"></div>
				</div>
				<small>{{ productImage.name }}</small>
			</div>

			<!-- <div class="card m-2" v-for="(productImage, index) in products.data" :key="index">
					<div class="inner">
						<img
							v-for="(pImg, index) in productImage.product_images"
							:key="index"
							:src="`/storage/uploads/product_images/${pImg.product_image}`"
							width="100"
							alt="Leemashop"
							class="img-fluid shadow p-3 m-3"
						/>
						<div class="card-body p-2">
							<h5 class="card-title text-center text-capitalize">
								{{ productImage.name }}
							</h5>
						</div>
					</div>
				</div> -->
		</div>

		<!-- <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
				<swiper-slide
					v-for="(pImg, index) in products.data"
					:key="index"
					:class="`slide-${index}`"
					:style="`background-image:url(/storage/uploads/product_images/${pImg.product_image}`"
				>
					{{ pImg }}
				</swiper-slide>
				<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
				<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
			</swiper> -->
		<!-- swiper2 Thumbs -->
		<!-- <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
				<swiper-slide
					v-for="(pImg, index) in products.data"
					:key="index"
					:class="`slide-${index}`"
					:style="`background-image:url(/storage/uploads/product_images/${pImg.product_image}`"
				></swiper-slide>
			</swiper> -->
	</div>
</template>

<script>
	// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
	// import "swiper/swiper-bundle.min.css";
	import { mapGetters } from "vuex";
	export default {
		name: "ProductImages",

		// components: {
		// 	Swiper,
		// 	SwiperSlide,
		// },
		// data() {
		// 	return {
		// 		swiperOptionTop: {
		// 			loop: true,
		// 			loopedSlides: 5, // looped slides should be the same
		// 			spaceBetween: 10,
		// 			navigation: {
		// 				nextEl: ".swiper-button-next",
		// 				prevEl: ".swiper-button-prev",
		// 			},
		// 		},
		// 		swiperOptionThumbs: {
		// 			loop: true,
		// 			loopedSlides: 5, // looped slides should be the same
		// 			spaceBetween: 10,
		// 			centeredSlides: true,
		// 			slidesPerView: "auto",
		// 			touchRatio: 0.2,
		// 			slideToClickedSlide: true,
		// 		},
		// 	};
		// },

		computed: {
			...mapGetters({ products: "product/products" }),
		},

		// updated() {
		// 	if (this.isInit === 1) {
		// 		this.$nextTick(() => {
		// 			const swiperTop = this.$refs.swiperTop.swiper;
		// 			const swiperThumbs = this.$refs.swiperThumbs.swiper;
		// 			swiperTop.controller.control = swiperThumbs;
		// 			swiperThumbs.controller.control = swiperTop;
		// 		});
		// 		this.isInit = 0;
		// 	}
		// },

		// mounted() {
		// 	this.$nextTick(() => {
		// 		const swiperTop = this.$refs.swiperTop.$swiper;
		// 		const swiperThumbs = this.$refs.swiperThumbs.$swiper;
		// 		swiperTop.controller.control = swiperThumbs;
		// 		swiperThumbs.controller.control = swiperTop;
		// 	});
		// },
	};
</script>

<style scoped lang="scss">
	.inner {
		overflow: hidden;
	}
	.inner img {
		transition: all 1.5s ease;
	}
	.inner:hover img {
		transform: scale(1.2);
	}
</style>
