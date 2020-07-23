<template>
  <b-field :label="label" custom-class="is-small">
    <b-autocomplete
      v-model="value"
      :data="filteredOptions"
      :placeholder="placeholder"
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
    }
  },
  data() {
    return {
      value: ''
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
    setValue() {
      this.$emit('input', this.value)
    }
  }
}
</script>
