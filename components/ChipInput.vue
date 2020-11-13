<template>
  <Field :label="label">
    <b-taginput
      allow-duplicates
      allow-new
      autocomplete
      :data="filteredOptions"
      :placeholder="placeholder"
      rounded
      type="is-primary"
      :value="value"
      @input="setValue"
      @typing="setInput"
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    filteredOptions() {
      return this.sortedOptions.filter(option =>
        option.toLowerCase().startsWith(this.input.toLowerCase())
      )
    },
    sortedOptions() {
      return sort(this.options)
    }
  },
  methods: {
    handleDuplicate(arr) {
      const last = arr[arr.length - 1]
      const hasDuplicate = arr.filter(i => i === last).length > 1
      return hasDuplicate ? arr.slice(0, -1) : arr
    },
    resetInput() {
      this.input = ''
    },
    setInput(input) {
      this.input = input
    },
    setValue(value) {
      this.$emit('input', this.handleDuplicate(value))
      this.resetInput()
    }
  }
}
</script>
