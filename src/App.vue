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
      cartCount: 0,
      totalPrice: 0,
    }
  },
  // computed: {
  //   totalPrice() {
  //     return this.cart.reduce((sum, item) => sum + item.price, 0)
  //   },
  // },
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
    // addToCart(lesson) {
    //   // Reduce space and add lesson to cart
    //   if (lesson.spaces > 0) {
    //     lesson.spaces -= 1
    //     this.cart.push({ ...lesson })
    //   }
    // },

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
      console.log('Clicked the removeFromCart: ', existingLessonIndex)

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

    // removeFromCart(lessonId) {
    //   const index = this.cart.findIndex(cartItem => cartItem._id === lessonId)
    //   if (index > -1) {
    //     const removedLesson = this.cart.splice(index, 1)[0] // Remove from cart and get the lesson

    //     // Restore spaces to the correct lesson in the lessons array
    //     const originalLesson = this.lessons.find(
    //       l => l._id === removedLesson._id,
    //     )
    //     if (originalLesson) {
    //       originalLesson.spaces += 1
    //     }

    //     // Check if cart is empty and switch back to lessons list
    //     if (this.cart.length === 0) {
    //       this.showCart = false
    //     }
    //   }
    // },

    clearCart() {
      this.cart = []
      this.showCart = false // Switch back to lesson list
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
