<template>
  <b-field :label="label" custom-class="is-small">
    <b-autocomplete
      :data="filteredOptions"
      :placeholder="placeholder"
      :value="value"
      @input="setValue"
    />
  </b-field>
</template>

<script>
import { sort } from '@/lib/helpers'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filteredOptions() {
      return this.sortedOptions.filter(option =>
        option.toLowerCase().startsWith(this.value.toLowerCase())
      )
    },
    sortedOptions() {
      return sort(this.options)
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
