<template>
  <b-field class="columns is-multiline">
    <!-- TODO: add optional label -->
    <div v-for="option in options" :key="option" class="column is-one-quarter">
      <b-checkbox
        v-model="value"
        :native-value="option"
        class="checkbox-item"
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
  methods: {
    setValue() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="scss">
.checkbox-item {
  width: 100%;
  .control-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
