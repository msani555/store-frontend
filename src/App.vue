<template>
  <div>
    <NavBar :cartCount="cart.length" @toggle-cart="toggleView" />
    <div v-if="showCart">
      <Cart :cart="cart" @remove-from-cart="removeFromCart" />
    </div>
    <div v-else>
      <LessonList :lessons="lessons" @add-to-cart="addToCart" />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import LessonList from './views/CourseListPage.vue'
import Cart from './views/CartPage.vue'

export default {
  components: { NavBar, LessonList, Cart },
  data() {
    return {
      lessons: [],
      cart: [],
      showCart: false,
    }
  },
  methods: {
    async fetchLessons() {
      try {
        const response = await fetch('http://localhost:5050/api/lessons')
        const data = await response.json()
        console.log('data:', data.results)
        this.lessons = data.results
      } catch (error) {
        console.error('Error fetching lessons:', error)
      }
    },
    addToCart(lesson) {
      // Reduce space and add lesson to cart
      if (lesson.spaces > 0) {
        lesson.spaces -= 1
        this.cart.push({ ...lesson })
      }
      console.log(`cart: `, this.cart)
    },

    toggleView() {
      this.showCart = !this.showCart
    },

    removeFromCart(lesson) {
      const index = this.cart.indexOf(lesson)
      if (index > -1) {
        this.cart.splice(index, 1)
        lesson.spaces++
      }
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
