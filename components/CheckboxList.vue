<template>
  <Field :label="label">
    <ul class="checkbox-list columns is-multiline">
      <li
        v-for="item in checkboxList"
        :key="item"
        class="column is-one-third-mobile is-one-quarter-tablet is-one-fifth-desktop"
      >
        <b-checkbox
          v-model="checkedItems"
          :native-value="item"
          class="checkbox-list-item"
          @input="setValue"
        >
          {{ item }}
        </b-checkbox>
      </li>
    </ul>
    <!-- TODO: add 'add new' button/input -->
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
    list: {
      type: Array,
      default: () => []
    },
    sorted: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedItems: this.value
    }
  },
  computed: {
    checkboxList() {
      return this.sorted ? sort(this.list) : this.list
    }
  },
  methods: {
    setValue() {
      this.$emit('input', this.checkedItems)
    }
  }
}
</script>

<style lang="scss">
.checkbox-list {
  display: flex;
  /* overrides negative margin in .columns class */
  margin-top: unset;
  &:last-child {
    margin-bottom: unset;
  }
  .column {
    display: flex;
    /* overrides default padding and column width */
    padding: 0.25rem 0.75rem;
    @media screen and (max-width: 600px) {
      width: 50%;
    }
    @media screen and (max-width: 425px) {
      width: 100%;
    }
    .checkbox-list-item {
      width: 100%;
      .control-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
