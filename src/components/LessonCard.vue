<template>
  <div class="border p-4 h-100 bg-light">
    <div class="d-flex justify-content-between">
      <div>
        <h3>{{ lesson.subject }}</h3>
        <p p>Location: {{ lesson.location }}</p>
        <p>Price: ${{ lesson.price }}</p>
        <p>Spaces: {{ lesson.spaces }}</p>
      </div>

      <img
        :src="lesson.imageUrl"
        alt="lesson.imageUrl"
        class="img-fluid"
        style="width: 90px; height: 100%"
      />
    </div>
    <button
      class="btn btn-lg btn-primary col-12"
      @click="addToCart"
      :disabled="lesson.spaces <= 0"
    >
      {{ lesson.spaces > 0 ? 'Add to Cart' : 'Sold Out' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    lesson: Object,
  },
  methods: {
    addToCart() {
      if (this.lesson.spaces > 0) {
        this.$emit('add-to-cart', this.lesson)
      }
    },
  },
}
</script>
