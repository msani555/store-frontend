<template>
  <div class="container">
    <section class="row">
      <article class="col-12 col-md-2">
        <div>
          <label
            v-for="option in sortOptions"
            :key="option"
            class="btn btn-outline-primary my-2 d-block"
            :class="{ active: sortAttribute === option }"
          >
            <input
              type="radio"
              name="attribute"
              :value="option"
              v-model="sortAttribute"
            />
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
          </label>
        </div>
        <h5 class="mt-3">Order:</h5>
        <div>
          <label class="btn btn-outline-secondary my-2 d-block">
            <input type="radio" name="order" value="asc" v-model="sortOrder" />
            Ascending
          </label>
          <label class="btn btn-outline-secondary d-block">
            <input type="radio" name="order" value="desc" v-model="sortOrder" />
            Descending
          </label>
        </div>
        <!-- <button @click="sortLessons">Sort</button> -->
      </article>

      <article class="col-12 col-md-10">
        <!--Search bar full text search-->

        <section class="row g-3">
          <div class="mb-4 col-12 col-md-8 mx-auto">
            <!-- Search Input -->
            <input
              type="text"
              class="form-control mb-4"
              placeholder="Search lessons by title, location, price, or availability..."
              v-model="searchQuery"
              @input="performSearch"
            />
          </div>
        </section>
        <section class="row g-3">
          <LessonCard
            class="col-6 col-md-4 card-container"
            v-for="lesson in sortedLessons"
            :key="lesson.id"
            :lesson="lesson"
            @add-to-cart="addToCart"
          />
        </section>
      </article>
    </section>
  </div>
</template>

<script>
import LessonCard from '../components/LessonCard.vue'
const baseUrl = window.config?.API_BASE_URL || 'http://localhost:5050/api'

export default {
  components: { LessonCard },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortAttribute: 'subject',
      sortOrder: 'asc',
      selectedLesson: null,
      sortOptions: ['subject', 'location', 'price', 'spaces'],
      // search
      searchQuery: '', // Input query
      fetchedLessons: [],
      typingTimeout: null, // Timeout for "search as you type"
    }
  },
  computed: {
    sortedLessons() {
      // Create a sorted copy of lessons
      const lessons = this.searchQuery ? this.fetchedLessons : this.lessons
      return [...lessons].sort((a, b) => {
        const order = this.sortOrder === 'asc' ? 1 : -1
        const attr = this.sortAttribute

        if (typeof a[attr] === 'string') {
          return a[attr].localeCompare(b[attr]) * order
        }
        return (a[attr] - b[attr]) * order
      })
    },
  },
  methods: {
    addToCart(lesson) {
      this.$emit('add-to-cart', lesson)
    },

    performSearch() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout)
      }

      this.typingTimeout = setTimeout(() => {
        if (!this.searchQuery.trim()) {
          this.fetchedLessons = []
          return
        }

        fetch(`${baseUrl}/search?query=${this.searchQuery}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch search results')
            }
            return response.json()
          })
          .then(data => {
            this.fetchedLessons = data // Use the fetched data
            console.log(`fetchedLessons: `, this.fetchedLessons)
          })
          .catch(error => {
            console.error('Error fetching search results:', error)
            this.fetchedLessons = []
          })
      }, 300) // Delay of 300ms
    },
  },
}
</script>
<style>
.card-container {
  max-width: 100%;
  box-sizing: border-box;
}
</style>
