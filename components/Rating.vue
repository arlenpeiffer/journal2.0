<template>
  <Field :error="error" :label="label">
    <b-rate spaced :value="value" @change="setValue" />
  </Field>
</template>

<script>
import Field from '@/components/Field'
import field from '@/mixins/field'

export default {
  components: {
    Field
  },
  mixins: [field],
  props: {
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
