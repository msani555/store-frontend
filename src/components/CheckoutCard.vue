<template>
  <form @submit.prevent="submitOrder" class="border p-4 rounded-3">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="form-control"
        :class="{ 'is-invalid': nameError }"
        placeholder="Enter your name"
        @blur="validateName"
      />
      <div class="invalid-feedback">Name must contain only letters.</div>
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Phone</label>
      <input
        type="text"
        id="phone"
        v-model="phone"
        class="form-control"
        :class="{ 'is-invalid': phoneError }"
        placeholder="Enter your phone number"
        @blur="validatePhone"
      />
      <div class="invalid-feedback">Phone must contain only numbers.</div>
    </div>

    <button
      type="submit"
      class="btn btn-success w-100"
      :disabled="!isFormValid"
    >
      <span v-if="loading" class="spinner-border text-light"></span>
      <span v-else>Checkout</span>
    </button>
  </form>
</template>

<script>
const baseUrl = window.config?.API_BASE_URL || 'http://localhost:5050/api'
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      nameError: false,
      phoneError: false,
      touchedName: false, // Tracks if the name field was interacted with
      touchedPhone: false, // Tracks if the phone field was interacted with
      isFormValid: false,
      loading: false, // Loading state for button
    }
  },
  methods: {
    validateName() {
      this.touchedName = true // Mark field as touched
      this.nameError = !/^[a-zA-Z\s]+$/.test(this.name)
      this.updateFormValidity()
    },
    validatePhone() {
      this.touchedPhone = true // Mark field as touched
      this.phoneError = !/^\d+$/.test(this.phone)
      this.updateFormValidity()
    },
    updateFormValidity() {
      this.isFormValid =
        !this.nameError && !this.phoneError && this.name && this.phone
    },
    async submitOrder() {
      // Prevent multiple submissions
      if (this.loading) return
      this.loading = true // Set loading state to true

      try {
        // 1. Prepare order data
        const orderData = {
          name: this.name,
          phone: this.phone,
          lessonIDs: this.cart.map(lesson => lesson._id),
          spaces: this.cart.map(lesson => ({
            id: lesson._id,
            // spaces: lesson.spaces,
            spaces: lesson.quantity,
          })),
        }
        console.log('ordered data: ', orderData)

        // 2. Send order to the database
        const orderResponse = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })

        if (!orderResponse.ok) {
          throw new Error('Failed to save order.')
        }

        // 3. Update lesson spaces in the database
        const updatePromises = this.cart.map(lesson =>
          fetch(`${baseUrl}/lessons/${lesson._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: lesson.spaces - lesson.quantity }),
          }),
        )

        await Promise.all(updatePromises)

        // 4. Reset form and cart on success
        alert('Order has been submitted successfully!')
        this.$emit('clear-cart')
        this.name = ''
        this.phone = ''
        this.isNameTouched = false
        this.isPhoneTouched = false
      } catch (error) {
        console.error('Error submitting order:', error)
        alert('An error occurred while submitting the order.')
      } finally {
        this.loading = false // Reset loading state after completion
      }
    },
  },
}
</script>
