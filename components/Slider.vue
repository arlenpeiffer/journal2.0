<template>
  <Field :label="label">
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

export default {
  components: {
    Field
  },
  props: {
    format: {
      type: Function,
      default: value => value
    },
    label: {
      type: String,
      default: ''
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
