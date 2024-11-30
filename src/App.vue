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
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0)
    },
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
    },

    toggleView() {
      this.showCart = !this.showCart
    },

    // Remove lesson from cart and adjust space count
    // removeFromCart(lesson) {
    //   const index = this.cart.indexOf(lesson)
    //   if (index > -1) {
    //     this.cart.splice(index, 1)
    //   }
    // },
    removeFromCart(lessonId) {
      const index = this.cart.findIndex(cartItem => cartItem._id === lessonId)
      if (index > -1) {
        const removedLesson = this.cart.splice(index, 1)[0] // Remove from cart and get the lesson

        // Restore spaces to the correct lesson in the lessons array
        const originalLesson = this.lessons.find(
          l => l._id === removedLesson._id,
        )
        if (originalLesson) {
          originalLesson.spaces += 1
        }

        // Check if cart is empty and switch back to lessons list
        if (this.cart.length === 0) {
          this.showCart = false
        }
      }
    },
  },

  //   removeFromCart(lesson) {
  //     const index = this.cart.indexOf(lesson)
  //     console.log('index: ', index)
  //     if (index > -1) {
  //       this.cart.splice(index, 1)
  //       lesson.spaces++
  //     }
  //   },
  // },
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
