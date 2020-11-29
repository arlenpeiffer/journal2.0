<template>
  <Field :error-message="errorMessage" :has-error="hasError" :label="label">
    <b-slider
      :custom-formatter="format"
      indicator
      :max="max"
      :min="min"
      size="is-medium"
      :step="step"
      :tooltip="false"
      :value="value"
      @change="setValue"
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
    format: {
      type: Function,
      default: value => value
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
.b-slider-thumb {
  white-space: nowrap;
}
</style>
