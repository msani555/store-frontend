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
            v-for="lesson in lessons"
            v-bind:key="lesson.id"
            class="col-6 col-md-4"
          >
            <div class="border p-4 h-100 bg-light">
              <div class="d-flex justify-content-between">
                <router-link v-bind:to="'/courses/' + lesson.id">
                  <p>
                    Name: <b>{{ lesson.subject }}</b>
                  </p>
                  <p>
                    Location: <b>{{ lesson.location }}</b>
                  </p>
                  <p>
                    Price: <b>${{ lesson.price }}</b>
                  </p>
                  <p>
                    Spaces: <b>{{ lesson.spaces }}</b>
                  </p>
                </router-link>
                <img
                  :src="lesson.imageUrl"
                  alt="lesson.imageUrl"
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
export default {
  name: 'lessonsPage',
  data() {
    return {
      lessons: [],
      title: 'lessons',
    }
  },
  methods: {
    async fetchLessons() {
      try {
        const response = await fetch('http://localhost:5050/api/lessons')
        const data = await response.json()
        console.log('data:', data.results)
        this.lessons = data.results
        console.log('app: ', this.lessons)
      } catch (error) {
        console.error('Error fetching lessons:', error)
      }
    },
  },
  created() {
    this.fetchLessons()
    // this.fetchCart() // Fetch the user's cart on page load
  },
}
</script>

<style scoped>
h1 {
  color: green;
}
</style>
