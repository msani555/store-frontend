<template>
  <section class="container">
    <div class="row g-4">
      <article class="col-12 col-md-8">
        <article
          v-for="cartItem in cart.slice().reverse()"
          :key="cartItem.id"
          class="mb-3"
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
                Qty: <b class="text-primary">{{ cartItem.quantity }}</b>
              </p>
              <p>
                Location: <b>{{ cartItem.location }}</b>
              </p>
              <p>
                Price: <b>${{ cartItem.price }}</b>
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
      </article>

      <article class="col-12 col-md-4">
        <CheckoutCard :cart="cart" @clear-cart="clearCart" />
      </article>

      <div class="row pt-2">
        <article class="col-12 col-md-10 col-lg-8">
          <div class="text-end p-4 border-top border-4">
            <h4 class="fw-bolder">Total Price: ${{ totalPrice }}</h4>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import CheckoutCard from '../components/CheckoutCard.vue'
export default {
  components: { CheckoutCard },
  props: {
    cart: {
      type: Array,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },

  methods: {
    removeFromCart(lessonId) {
      this.$emit('remove-from-cart', lessonId)
    },

    clearCart() {
      this.$emit('clear-cart')
    },
  },
}
</script>

<style>
h1 {
  color: red;
}
</style>
