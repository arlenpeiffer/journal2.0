<template>
  <Field :label="label">
    <b-input
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="value"
      @input="setValue"
    />
  </Field>
</template>

<script>
import Field from '@/components/Field'

export default {
  components: {
    Field
  },
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
