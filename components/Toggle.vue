<template>
  <Field :label="label">
    <b-switch :value="value" @input="setValue">
      {{ toggleLabel }}
    </b-switch>
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
