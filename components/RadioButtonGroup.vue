<template>
  <Field :error-message="errorMessage" :has-error="hasError" :label="label">
    <b-field class="radio-button-group">
      <b-radio-button
        v-for="option in options"
        :key="option.value"
        :native-value="option.value"
        :value="value"
        @input="setValue"
      >
        {{ option.label }}
      </b-radio-button>
    </b-field>
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
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Boolean, Number, String],
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
.field {
  .radio-button-group {
    /* removes doubled margin-bottom */
    margin-bottom: unset;

    /* vertical layout for mobile */
    @media screen and (max-width: 600px) {
      .has-addons {
        flex-direction: column;
        .control {
          label {
            border-radius: 4px !important;
          }
          &:not(:last-of-type) {
            margin-bottom: 0.25rem;
          }
        }
      }
    }
  }
}
</style>
