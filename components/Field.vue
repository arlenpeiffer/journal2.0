<template>
  <b-field :label="label" :message="error" :type="type" custom-class="is-small">
    <slot />
  </b-field>
</template>

<script>
import field from '@/mixins/field'

export default {
  mixins: [field],
  computed: {
    type() {
      return this.error ? 'is-danger' : ''
    }
  }
}
</script>

<style lang="scss"></style>
