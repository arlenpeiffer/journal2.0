<template>
  <b-field :label="label" custom-class="is-small">
    <b-input
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="setValue"
    />
  </b-field>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss"></style>
