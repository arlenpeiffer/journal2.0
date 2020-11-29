<template>
  <Field :error-message="errorMessage" :has-error="hasError" :label="label">
    <b-switch :value="value" @input="setValue">
      {{ toggleLabel }}
    </b-switch>
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
    toggleLabelFalse: {
      type: String,
      default: ''
    },
    toggleLabelTrue: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    toggleLabel() {
      return this.value ? this.toggleLabelTrue : this.toggleLabelFalse
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
