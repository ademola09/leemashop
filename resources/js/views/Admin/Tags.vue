<template>
	<div class="tags">
		<div class="container h-100">
			<div class="intro shadow p-3 h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-md-6">
						<h3>Tags's Page</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.
						</p>
					</div>
					<div class="col-md-6">
						<img src="/img/mention.svg" class="img-fluid" width="300px" alt="Tags" />
					</div>
				</div>
			</div>

			<hr />

			<div class="tag-test shadow mb-4">
				<div class="d-flex align-items-center justify-content-between">
					<h3 class="d-inline-block ml-2"><i class="fas fa-list-alt text-success"></i> Tag List</h3>
					<div>
						<SearchTag />
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-8">
						<div class="table-responsive">
							<table class="table table-borderless table-hover table-striped" id="dataTable" cellspacing="0">
								<thead class="bg-success text-light">
									<tr>
										<th>Id</th>
										<th>Name</th>
										<th>Tagged Product</th>
										<th>Created At</th>
										<th>Updated At</th>
										<th>Action</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Id</th>
										<th>Name</th>
										<th>Tagged Product</th>
										<th>Created At</th>
										<th>Updated At</th>
										<th>Action</th>
									</tr>
								</tfoot>
								<tbody>
									<tr v-for="(tag, index) in tags.data" :key="index" class="animated fadeInUp">
										<td class="fs-12">{{ ++index }}</td>
										<td class="fs-12 text-capitalize">{{ tag.name }}</td>
										<td>
											<span class="btn btn-sm btn-info p-1 mr-1" v-for="(tagged, index) in tag.products" :key="index">
												<i class="fas fa-tag"></i>
												{{ tagged.name }}</span>
										</td>
										<td class="fs-12">{{ tag.created_at | formatDate }}</td>
										<td class="fs-12">{{ tag.updated_at | formatDate }}</td>
										<td class="btn-group">
											<button @click="viewTag(tag.id)" class="btn btn-primary fs-12 border-0" title="View">
												<i class="fas fa-eye fs-12"></i>
											</button>
											<button @click="editModal(tag)" class="btn btn-warning fs-12 border-0" title="Edit">
												<i class="fas fa-edit fs-12"></i>
											</button>
											<button @click="deleteTag(tag.id)" class="btn btn-bg fs-12 border-0" title="Delete">
												<i class="fas fa-trash-alt fs-12"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
							<pagination :data="tags" @pagination-change-page="getPagination" :limit="5" align="center" size="small">
								<span slot="prev-nav">&lt; Previous</span>
								<span slot="next-nav">Next &gt;</span>
							</pagination>
						</div>
					</div>
					<div class="col-md-4 pl-5 pr-5">
						<label class="typo__label">Tagging</label>
						<multiselect
							v-model="form.tags"
							tag-placeholder="Add this as new tag"
							placeholder="Search or add a tag"
							label="name"
							track-by="name"
							:options="tags.data"
							:multiple="true"
							:taggable="true"
							@tag="pushTag"
						></multiselect>
						<!-- <pre class="tag_id-json"><code>{{ form  }}</code></pre> -->
						<button @click="addToTag()" class="btn btn-sm btn-primary">
							Add Tag
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="tagId" tabindex="-1" role="dialog" aria-labelledby="editTagLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editTagLabel" v-if="modal == 'new'"><i class="fa fa-plus-circle text-primary"></i> Add Tag</h5>
						<h5 class="modal-title" id="editTagLabel" v-else><i class="fa fa-edit text-warning"></i> Edit Tag</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<input type="text" v-model="form.name" class="form-control" placeholder="Tag Name" />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer text-center">
						<button @click="editTag()" class="btn btn-sm btn-primary" v-if="modal == 'edit'">
							Update Tag
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- View Single Tag -->
		<div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewTagModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="viewTagModalLabel">Tag Details</h5>
						<button class="close" type="button" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">×</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="card align-items-center">
							<div class="card-body">
								<div class="text-center mb-3">
									<h4 class="card-title">Name: {{ tag.name }}</h4>
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
	import Multiselect from "vue-multiselect";
	import SearchTag from "../../components/SearchTag";
	export default {
		name: "Tags",
		components: { Multiselect, SearchTag },

		data() {
			return {
				form: {
					tags: [],
				},
				modal: "",
			};
		},

		computed: {
			...mapGetters({ tags: "tag/tags", tag: "tag/tag" }),
		},
		methods: {
			...mapActions("tag", ["getTags", "getTag", "addTag", "updateTag", "deleteTag", "getPagination", "disTag"]),

			pushTag(newTag) {
				const tag = {
					name: newTag,
					// tag_id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
				};
				this.form.tags.push(tag);
			},

			addToTag() {
				this.addTag(this.form);
				$("#tagId").modal("hide");
				this.reset();
			},

			viewTag(pId) {
				this.getTag(pId);
				$("#viewModal").modal("show");
			},

			editModal(tag) {
				this.modal = "edit";
				this.form = tag;
				$("#tagId").modal("show");
			},

			editTag() {
				this.updateTag(this.form);
				$("#tagId").modal("hide");
				this.reset();
			},

			reset() {
				this.form = {
					tags: [],
				};
			},
		},

		beforeMount() {
			this.getPagination();
			this.getTags();
		},
	};
</script>

<style scoped lang="scss">
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
