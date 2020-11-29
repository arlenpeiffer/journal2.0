<template>
  <Field :error-message="errorMessage" :has-error="hasError" :label="label">
    <b-timepicker
      hour-format="12"
      inline
      size="is-small"
      :value="toDate(value)"
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
    value: {
      type: [Date, Number],
      default: new Date()
    }
  },
  mounted() {
    this.handleInitialization()
  },
  methods: {
    handleInitialization() {
      // sets initial value to current time in milliseconds
      if (typeof this.value !== 'number') {
        this.setValue(new Date())
      }
    },
    setValue(value) {
      this.$emit('input', this.toUnix(value))
    },
    toDate(date) {
      return this.$dayjs(date).toDate()
    },
    toUnix(date) {
      return this.$dayjs(date).valueOf()
    }
  }
}
</script>

<style lang="scss"></style>
