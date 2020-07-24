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
      return this.options.filter(option =>
        option.toLowerCase().startsWith(this.value.toLowerCase())
      )
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
