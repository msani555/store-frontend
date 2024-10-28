<template>
  <section class="container">
    <div class="row">
      <article class="col-12 col-md-10 col-lg-8 mx-auto">
        <div class="d-flex justify-content-around">
          <div class="align-self-center">
            <h4>
              Name: <b>{{ course.subject }}</b>
            </h4>
            <h4>
              Location: <b>{{ course.location }}</b>
            </h4>
            <h4>
              Price: <b>${{ course.price }}</b>
            </h4>
            <h4>
              Spaces: <b>{{ course.spaces }}</b>
            </h4>
            <div class="pt-4">
              <button class="btn btn-lg btn-primary col-12">Buy Course</button>
            </div>
          </div>
          <img
            v-bind:src="course.imageUrl"
            alt="product.imageUrl"
            class="img-fluid"
            style="width: 400px; height: 100%"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { products } from '@/dummy_data'

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      course: products.find(p => p.id === this.$route.params.id),
    }
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
