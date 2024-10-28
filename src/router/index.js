import { createRouter, createWebHistory } from 'vue-router'
import CourseListPage from '@/views/CourseListPage.vue'
import CourseDetailsPage from '@/views/CourseDetailsPage.vue'
import CartPage from '@/views/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/courses',
      name: 'products',
      component: CourseListPage,
    },
    {
      path: '/courses/:id',
      name: 'productDetails',
      component: CourseDetailsPage,
    },
    {
      path: '/carts',
      name: 'CartItems',
      component: CartPage,
    },
    {
      path: '/',
      component: CourseListPage,
    },
  ],
})

export default router
