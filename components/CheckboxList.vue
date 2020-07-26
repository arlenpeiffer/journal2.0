<template>
  <b-field class="columns is-multiline checkbox-list">
    <!-- TODO: add optional label -->
    <div
      v-for="option in options"
      :key="option"
      class="column is-one-third-mobile is-one-quarter-tablet is-one-fifth-desktop"
    >
      <b-checkbox
        v-model="checkedItems"
        :native-value="option"
        class="checkbox-list-item"
        @input="setValue"
      >
        {{ option }}
      </b-checkbox>
    </div>
    <!-- TODO: add 'add new' button/input -->
  </b-field>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
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
