<template>
  <Field :label="label">
    <b-datepicker
      :events="datesWithEntries"
      :focusable="false"
      inline
      :max-date="toDate(today)"
      :parse-date="input => toDate(input)"
      :value="toDate(value)"
      @input="setValue"
    />
  </Field>
</template>

<script>
import { mapGetters } from 'vuex'
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
    value: {
      type: [Date, Number],
      default: new Date()
    }
  },
  computed: {
    datesWithEntries() {
      return this.journal.map(entry => this.toDate(entry.date))
    },
    today() {
      return this.$dayjs()
    },
    ...mapGetters(['journal'])
  },
  mounted() {
    this.handleInitialization()
  },
  methods: {
    handleInitialization() {
      // initializes new Date() as unix value
      if (typeof this.value !== 'number') {
        this.setValue(this.value)
      }
    },
    setValue(value) {
      this.$emit('input', this.toUnix(value))
    },
    toDate(date) {
      return this.$dayjs(date).startOf('day').toDate()
    },
    toUnix(date) {
      return this.$dayjs(date).startOf('day').valueOf()
    }
  }
}
</script>

<style lang="scss">
.datepicker {
  // overrides display:none when max-date is set
  .pagination-next {
    display: flex !important;
  }
}
</style>
