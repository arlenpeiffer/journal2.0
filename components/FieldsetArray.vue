<template>
  <div>
    <b-button type="is-primary capitalized" @click="addFieldset">
      {{ `Add ${label}` }}
    </b-button>
    <fieldset v-for="(item, ix) in array" :key="ix">
      <div class="remove-button">
        <b-tooltip :label="tooltipText" position="is-left" type="is-dark">
          <button class="delete" @click.prevent="openDialog(ix)" />
        </b-tooltip>
      </div>
      <slot :fieldset="item" />
      <span v-if="ix === lastIx" class="tag is-white" @click="addFieldset">
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
    lastIx() {
      return this.array.length - 1
    },
    lowercaseLabel() {
      return this.label.toLowerCase()
    },
    tooltipText() {
      return `Remove ${this.lowercaseLabel}`
    }
  },
  methods: {
    addFieldset() {
      const newFieldset = { ...this.fieldset }
      this.array.push(newFieldset)
    },
    handleConfirm(ix) {
      this.removeFieldset(ix)
      this.$buefy.toast.open(`${this.label} removed`)
    },
    openDialog(ix) {
      this.$buefy.dialog.confirm({
        cancelText: 'No',
        confirmText: 'Yes',
        hasIcon: true,
        icon: 'alert-decagram',
        message: `Are you sure you want to remove this ${this.lowercaseLabel}?`,
        onConfirm: this.handleConfirm(ix),
        title: `Remove ${this.lowercaseLabel}`
      })
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
