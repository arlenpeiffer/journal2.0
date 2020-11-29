<template>
  <Field :error="error" :label="label">
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
import field from '@/mixins/field'

export default {
  components: {
    Field
  },
  mixins: [field],
  props: {
    disabled: {
      type: Boolean,
      default: false
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
