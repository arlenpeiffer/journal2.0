<template>
  <Field :label="label">
    <b-rate spaced :value="value" @change="setValue" />
  </Field>
</template>

<script>
import Field from '@/components/Field'

export default {
  components: {
    Field
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleValue(value) {
      return value === this.value ? null : value
    },
    setValue(value) {
      this.$emit('input', this.handleValue(value))
    }
  }
}
</script>

<style lang="scss"></style>
