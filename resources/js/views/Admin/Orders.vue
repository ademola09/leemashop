<template>
  <div class="orders">
    <div class="container h-100">
      <div class="intro shadow p-3 h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Order's Page</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, veritatis.
            </p>
          </div>
          <div class="col-md-6">
            <img src="/img/online_payments.svg" class="img-fluid" width="400px" alt="orders" />
          </div>
        </div>
      </div>

      <hr />

      <div class="order-test">
        <h3 class="d-inline-block">Order List</h3>
        <button @click="addNew" class="btn btn-sm btn-primary float-right">Add Order</button>
        <div class="table-responsive">
          <table class="table table-sm table-borderless table-striped table-hover">
            <thead>
              <tr class="bg-info">
                <th>SN</th>
                <th>Name</th>
                <!-- <th>Description</th> -->
                <th>Tags</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="product.id">
                <td>{{ ++index }}</td>
                <td>{{ product.name }}</td>
                <!-- <td>{{ product.description }}</td> -->
                <td v-for="tag in product.tags" :key="tag.id" class="btn-group">
                  <span class="btn btn-sm btn-info">{{ tag }}</span>
                </td>
                <td>{{ product.price }}</td>
                <td class="btn-group">
                  <button @click="editProduct(product)" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
                  <button @click="deleteProduct(product)" class="btn btn-sm btn-danger"><i class="fa fa-trash-o"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editProductLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editProductLabel"><i class="fa fa-edit text-warning"></i> Add Order</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <input type="text" v-model="product.name" class="form-control" placeholder="Product Name" />
                </div>
                <div class="form-group">
                  <textarea name="" id="" class="form-control" rows="10"></textarea>
                  <!-- <vue-editor v-model="product.description" cols="30" rows="7" placeholder="Order Description"></vue-editor> -->
                </div>
              </div>
              <div class="col-md-4">
                <h4 class="display-6">Order Details</h4>
                <hr />
                <div class="form-group">
                  <input type="text" v-model="product.price" class="form-control" placeholder="Order Price" />
                </div>
                <div class="form-group">
                  <input type="text" @keyup.188="addTag" v-model="tag" class="form-control" placeholder="Order Tags" />
                  <div class="d-flex">
                    <p v-for="tag in product.tags" :key="tag.id">
                      <span class="p-1">{{ tag }}</span>
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="order_image">Order Images</label>
                  <input type="file" @change="uploadImage" class="form-control" id="order_image" />
                </div>
                <div class="form-group d-flex">
                  <div class="p-1 h-auto" v-for="(image, index) in product.images" :key="image.id">
                    <div class="img-wrap">
                      <img :src="image" class="img-thumbnail h-100" alt="Uploads" width="80px" />
                      <span @click="deleteImage(image, index)" class="badge badge-danger delete-img">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="addProduct()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'new'">Add Order</button>
            <button @click="updateProduct()" class="btn btn-sm btn-primary ml-3" v-if="modal == 'edit'">Update Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { fb, db } from "../firebase";
// import { VueEditor } from "vue2-editor";

export default {
  name: "Orders",
  components: {
    // VueEditor
  },
  // props: {
  //   msg: String
  // },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      activeItem: null,
      tag: null,
      modal: null
    };
  },
  // firestore() {
  //   return {
  //     products: db.collection("products")
  //   };
  // },
  methods: {
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
  //     if (e.target.files[0]) {
  //       let file = e.target.files[0];
  //       var storageRef = fb.storage().ref("products/" + file.name);
  //       let uploadTask = storageRef.put(file);

  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {},
  //         (error) => {
  //           // Handle unsuccessful uploads
  //         },
  //         () => {
  //           // Handle successful uploads on complete
  //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //             this.product.images.push(downloadURL);
  //             console.log("File available at", downloadURL);
  //           });
  //         }
  //       );
  //     }
    },
  //   deleteImage(img, index) {
  //     let image = fb.storage().refFromURL(img);
  //     this.product.images.splice(index, 1);
  //     image
  //       .delete()
  //       .then(() => {
  //         Toast.fire({
  //           icon: "error",
  //           title: "Image deleted successfully!"
  //         });
  //         console.log("Image deleted successfully!");
  //       })
  //       .catch((error) => {
  //         // Uh-oh, an error occurred!
  //         console.log("An error occurred!");
  //       });
  //   },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      };
    },
    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
  //   addProduct() {
  //     this.$firestore.products.add(this.product);
  //     $("#product").modal("hide");
  //     Toast.fire({
  //       icon: "success",
  //       title: "Product added successfully!"
  //     });
  //   },
  //   deleteProduct(doc) {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!"
  //     }).then((result) => {
  //       if (result.value) {
  //         this.$firestore.products.doc(doc.id).delete();
  //         Toast.fire({
  //           type: "error",
  //           icon: "error",
  //           title: "Data deleted successfully!"
  //         });
  //       }
  //     });
  //   },
  //   editProduct(product) {
  //     this.modal = "edit";
  //     this.product = product;
  //     $("#product").modal("show");
  //   },
  //   updateProduct() {
  //     this.$firestore.products.doc(this.product.id).update(this.product);
  //     $("#product").modal("hide");
  //     Toast.fire({
  //       icon: "success",
  //       title: "Product updated successfully!"
  //     });
  //   }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.img-wrap {
  position: relative;
}
.img-wrap span.delete-img {
  position: absolute;
  top: -14px;
  left: 0px;
}
.img-wrap span.delete-img:hover {
  cursor: pointer;
}
</style>
