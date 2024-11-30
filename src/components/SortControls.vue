<template>
  <div class="d-flex flex-column align-items-start mb-3">
    <h5>Sort By:</h5>
    <div v-for="option in sortOptions" :key="option" class="form-check">
      <input
        type="radio"
        class="form-check-input"
        :id="`sort-${option}`"
        :value="option"
        v-model="selectedAttribute"
      />
      <label :for="`sort-${option}`" class="form-check-label">
        {{ option }}
      </label>
    </div>
    <!-- <div>
      <label
        v-for="option in sortOptions"
        :key="option"
        class="btn btn-outline-primary my-2 d-block"
        :class="{ active: selectedAttribute === option }"
      >
        <input
          type="radio"
          name="attribute"
          :value="option"
          v-model="selectedAttribute"
        />
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </label>
    </div> -->
    <h5 class="mt-3">Order:</h5>
    <div>
      <label
        class="btn btn-outline-secondary my-2 d-block"
        :class="{ active: sortOrder === 'asc' }"
        @click="setSortOrder('asc')"
      >
        <input type="radio" name="order" value="asc" checked />
        Ascending
      </label>
      <label
        class="btn btn-outline-secondary"
        :class="{ active: sortOrder === 'desc' }"
        @click="setSortOrder('desc')"
      >
        <input type="radio" name="order" value="desc" />
        Descending
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sortOptions: Array,
    onSort: Function,
  },
  data() {
    return {
      selectedAttribute: 'subject',
    }
  },
  methods: {
    setSortOrder(order) {
      if (this.selectedAttribute) {
        this.$emit('onSort', { attribute: this.selectedAttribute, order })
      } else {
        console.warn('No attribute selected for sorting.')
      }
    },
  },
}
</script>
