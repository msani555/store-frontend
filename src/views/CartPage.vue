<template>
  <section class="container">
    <div class="row g-4">
      <article
        v-for="cartItem in cart.slice().reverse()"
        :key="cartItem.id"
        class="col-12 col-md-10 col-lg-8 mx-auto"
      >
        <div class="d-flex justify-content-between border p-4 rounded-3">
          <img
            v-bind:src="cartItem.imageUrl"
            alt="item.imageUrl"
            class="img-fluid"
            style="width: 90px; height: 100%"
          />
          <div>
            <p>
              Name: <b>{{ cartItem.subject }}</b>
            </p>
            <p>
              Location: <b>${{ cartItem.location }}</b>
            </p>
            <p>
              Price: <b>${{ cartItem.price }}</b>
              <b>${{ cartItem._id }}</b>
            </p>
          </div>
          <div class="align-self-center">
            <button
              @click="removeFromCart(cartItem._id)"
              class="btn btn-lg btn-dark"
            >
              Remove Course
            </button>
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
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  methods: {
    removeFromCart(lessonId) {
      this.$emit('remove-from-cart', lessonId)
    },
  },
}
</script>

<style>
h1 {
  color: red;
}
</style>
