<template>
  <b-field
    custom-class="is-small"
    :label="label"
    :message="message"
    :type="type"
  >
    <slot />
  </b-field>
</template>

<script>
import field from '@/mixins/field'

export default {
  mixins: [field],
  computed: {
    message() {
      return this.hasError ? this.errorMessage : ''
    },
    type() {
      return this.hasError ? 'is-danger' : ''
    }
  }
}
</script>

<style lang="scss"></style>
