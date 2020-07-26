<template>
  <b-field class="columns is-multiline checkbox-list">
    <!-- TODO: add optional label -->
    <div
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
    </div>
    <!-- TODO: add 'add new' button/input -->
  </b-field>
</template>

<script>
import { sort } from '@/lib/helpers'

export default {
  props: {
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
  .column {
    /* overrides default padding */
    padding: 0.25rem 0.75rem;
    /* overrides column size classes */
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
