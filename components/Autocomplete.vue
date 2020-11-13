<template>
  <Field :label="label">
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

export default {
  components: {
    Field
  },
  props: {
    label: {
      type: String,
      default: ''
    },
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
