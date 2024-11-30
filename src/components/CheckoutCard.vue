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
        @blur="isNameTouched = true"
      />
      <div class="invalid-feedback" v-if="nameError">
        Name must contain only letters.
      </div>
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
        @blur="isPhoneTouched = true"
      />
      <div class="invalid-feedback" v-if="phoneError">
        Phone must contain only numbers.
      </div>
    </div>

    <button
      type="submit"
      class="btn btn-success w-100"
      :disabled="!isFormValid"
    >
      Checkout
    </button>
  </form>
</template>

<script>
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
    }
  },
  computed: {
    nameError() {
      return !/^[a-zA-Z\s]+$/.test(this.name)
    },
    phoneError() {
      return !/^\d+$/.test(this.phone)
    },
    isFormValid() {
      return this.name && this.phone && !this.nameError && !this.phoneError
    },
  },
  methods: {
    async submitOrder() {
      try {
        // 1. Prepare order data
        const orderData = {
          name: this.name,
          phone: this.phone,
          lessonIDs: this.cart.map(lesson => lesson._id),
          lessons: this.cart.map(lesson => ({
            id: lesson._id,
            spaces: lesson.spaces,
          })),
        }
        console.log('ordered data: ', orderData)

        // 2. Send order to the database
        /*const orderResponse = await fetch('http://localhost:5050/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })

        if (!orderResponse.ok) {
          throw new Error('Failed to save order.')
        }*/

        // 3. Update lesson spaces in the database
        /*const updatePromises = this.cart.map(lesson =>
          fetch(`http://localhost:5050/api/lessons/${lesson._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaces: lesson.spaces }),
          }),
        )

        await Promise.all(updatePromises)
        */

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
      }
    },
  },
}
</script>
