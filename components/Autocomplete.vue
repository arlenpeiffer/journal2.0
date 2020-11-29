<template>
  <Field :error="error" :label="label">
    <b-autocomplete
      :data="filteredOptions"
      :placeholder="placeholder"
      :value="value"
      @input="setValue"
    />
  </Field>
</template>

<script>
import { sort } from '@/lib/helpers'
import Field from '@/components/Field'
import field from '@/mixins/field'

export default {
  components: {
    Field
  },
  mixins: [field],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    filteredOptions() {
      return this.sortedOptions.filter(option =>
        option.toLowerCase().startsWith(this.value.toLowerCase())
      )
    },
    sortedOptions() {
      return sort(this.options)
    }
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
