<template>
  <section class="container">
    <div class="row g-4">
      <article
        v-for="product in cartItems"
        :key="product.id"
        class="col-12 col-md-10 col-lg-8 mx-auto"
      >
        <div class="d-flex justify-content-between border p-4 rounded-3">
          <img
            v-bind:src="product.imageUrl"
            alt="item.imageUrl"
            class="img-fluid"
            style="width: 90px; height: 100%"
          />
          <div>
            <p>
              Name: <b>{{ product.subject }}</b>
            </p>
            <p>
              Location: <b>${{ product.location }}</b>
            </p>
            <p>
              Price: <b>${{ product.price }}</b>
            </p>
          </div>
          <div class="align-self-center">
            <button class="btn btn-lg btn-dark">Remove Course</button>
          </div>
        </div>
      </article>

      <article class="col-12 col-md-10 col-lg-8 mx-auto">
        <div class="text-end p-4 border-top border-4">
          <h4 class="fw-bolder">Total Price: ${{ totalPrice }}</h4>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
// import { cartItems } from '@/dummy_data'

export default {
  name: 'ProductsPage',
  data() {
    return {
      cartItems: [],
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + Number(item.price), 0.0)
    },
  },
}
</script>

<style>
h1 {
  color: red;
}
</style>
