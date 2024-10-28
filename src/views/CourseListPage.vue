<template>
  <div class="container">
    <section class="row">
      <article class="col-12 col-md-2">
        <form action="">
          <h5 class="fw-bolder">Sort By:</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="sortBy"
              id="subject"
              value="subject"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Subject
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="sortBy"
              id="location"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Location
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="sortBy"
              id="price"
              value="price"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Price
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="sortBy"
              id="availability"
              value="availability"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Availability
            </label>
          </div>
        </form>

        <form action="" class="pt-4">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="orderBy"
              id="subject"
              value="subject"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Ascending
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="orderBy"
              id="subject"
              value="subject"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Descending
            </label>
          </div>
        </form>
      </article>

      <article class="col-12 col-md-10">
        <section class="row g-4">
          <article
            v-for="product in products"
            v-bind:key="product.id"
            class="col-6 col-md-4"
          >
            <div class="border p-4 h-100 bg-light">
              <div class="d-flex justify-content-between">
                <router-link v-bind:to="'/courses/' + product.id">
                  <p>
                    Name: <b>{{ product.subject }}</b>
                  </p>
                  <p>
                    Location: <b>{{ product.location }}</b>
                  </p>
                  <p>
                    Price: <b>${{ product.price }}</b>
                  </p>
                  <p>
                    Spaces: <b>{{ product.spaces }}</b>
                  </p>
                </router-link>
                <img
                  v-bind:src="product.imageUrl"
                  alt="product.imageUrl"
                  class="img-fluid"
                  style="width: 90px; height: 100%"
                />
              </div>

              <div class="text-center pt-4">
                <button class="btn btn-lg btn-primary col-12">
                  Buy Course
                </button>
              </div>
            </div>
          </article>
        </section>
      </article>
    </section>
  </div>
</template>

<script>
import { products } from '../dummy_data'
export default {
  name: 'ProductsPage',
  data() {
    return {
      products,
      title: 'Hello products',
    }
  },
}
</script>

<style scoped>
h1 {
  color: green;
}
</style>
