<template>
  <div>
    <NavBar :cartCount="cartCount" @toggle-cart="toggleView" />
    <div v-if="showCart">
      <Cart
        :cart="cart"
        :totalPrice="totalPrice"
        @remove-from-cart="removeFromCart"
        @clear-cart="clearCart"
      />
    </div>
    <div v-else>
      <div class="text-center py-5" v-if="loading">
        <div
          class="spinner-border text-primary"
          style="width: 3rem; height: 3rem"
          role="status"
        ></div>
        <p class="sr-only">Fetching data please wait...</p>
      </div>
      <div v-else>
        <LessonList :lessons="lessons" @add-to-cart="addToCart" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import LessonList from './views/CourseListPage.vue'
import Cart from './views/CartPage.vue'

console.log(`base url ${__API_BASE_URL__}`)

export default {
  components: { NavBar, LessonList, Cart },
  data() {
    return {
      lessons: [],
      cart: [],
      showCart: false,
      cartCount: 0,
      totalPrice: 0,
      loading: true, // Add a loading state
    }
  },

  methods: {
    async fetchLessons() {
      try {
        const response = await fetch(`${__API_BASE_URL__}/lessons`)
        const data = await response.json()

        this.lessons = data.results
      } catch (error) {
        console.error('Error fetching lessons:', error)
      } finally {
        this.loading = false // Set loading to false after data fetching
      }
    },

    addToCart(lesson) {
      if (lesson.spaces > 0) {
        const existingLesson = this.cart.find(item => item._id === lesson._id)
        if (existingLesson) {
          existingLesson.quantity += 1 // Increment the quantity
          lesson.spaces -= 1
        } else {
          this.cart.push({ ...lesson, quantity: 1 }) // Add with initial quantity of 1
          lesson.spaces -= 1
        }
      }
      this.updateCartCount()
      this.updateTotalPrice()
    },

    toggleView() {
      this.showCart = !this.showCart
    },

    removeFromCart(lessonId) {
      const existingLessonIndex = this.cart.findIndex(
        item => item._id === lessonId,
      )

      if (existingLessonIndex > -1) {
        const existingLesson = this.cart[existingLessonIndex]

        if (existingLesson.quantity > 1) {
          existingLesson.quantity -= 1
          existingLesson.spaces += 1 // Adjust spaces on removal
        } else {
          this.cart.splice(existingLessonIndex, 1) // Remove lesson if only 1
        }
        // Restore the spaces to the original lesson
        const originalLesson = this.lessons.find(l => l._id === lessonId)
        if (originalLesson) {
          originalLesson.spaces += 1
        }
      }
      this.updateCartCount()
      this.updateTotalPrice()
      // Check if cart is empty and switch back to lessons list
      if (this.cart.length === 0) {
        this.showCart = false
      }
    },
    updateCartCount() {
      this.cartCount = this.cart.reduce(
        (total, lesson) => total + lesson.quantity,
        0,
      )
    },
    updateTotalPrice() {
      this.totalPrice = this.cart.reduce(
        (total, lesson) => total + lesson.quantity * lesson.price,
        0,
      )
    },

    clearCart() {
      this.cart = []
      this.showCart = false // Switch back to lesson list
      this.cartCount = 0
      this.totalPrice = 0
    },
  },

  mounted() {
    this.fetchLessons()
  },
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
