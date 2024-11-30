<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="bi bi-backpack2" style="color: darkblue"></i>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav ms-auto">
        <button :disabled="cartCount === 0" @click="toggleCart">
          <i class="bi bi-cart3"></i> ({{ cartCount }})
        </button>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['cartCount'], // Number of items in the cart
  methods: {
    toggleCart() {
      this.$emit('toggle-cart')
    },
  },
}
</script>

<style scoped>
.navbar {
  padding: 10px 0;
  margin-bottom: 4rem;
}

.navbar .nav-item {
  padding-left: 5px;
  font-size: 16px;
}

.navbar a {
  text-decoration: none;
  color: black !important;
}

.navbar .bi {
  font-size: 24px;
  font-weight: bolder;
}
</style>
