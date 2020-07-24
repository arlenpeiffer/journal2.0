<template>
  <div>
    <b-button type="is-primary capitalized" @click="addFieldset">
      {{ `Add ${label}` }}
    </b-button>
    <fieldset v-for="(item, ix) in array" :key="ix">
      <div class="remove-button">
        <button class="delete" @click.prevent="removeFieldset(ix)" />
      </div>
      <slot :fieldset="item" />
      <span v-if="isLastFieldset(ix)" class="tag is-white" @click="addFieldset">
        Add another {{ lowercaseLabel }}..
      </span>
    </fieldset>
  </div>
</template>

<script>
export default {
  props: {
    array: {
      type: Array,
      required: true
    },
    fieldset: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    lowercaseLabel() {
      return this.label.toLowerCase()
    }
  },
  methods: {
    addFieldset() {
      const newFieldset = { ...this.fieldset }
      this.array.push(newFieldset)
    },
    isLastFieldset(ix) {
      return ix === this.array.length - 1
    },
    removeFieldset(ix) {
      this.array.splice(ix, 1)
    }
  }
}
</script>

<style>
.capitalized {
  text-transform: capitalize;
}
.remove-button {
  display: flex;
  justify-content: flex-end;
}
</style>
