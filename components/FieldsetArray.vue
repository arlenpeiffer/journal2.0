<template>
  <div class="fieldset-array-wrap">
    <label v-if="fieldLabel" class="label is-small">{{ fieldLabel }}</label>
    <b-button
      type="is-primary"
      icon-left="plus-box-multiple"
      @click="addFieldset"
    >
      {{ `Add ${label}` }}
    </b-button>
    <div class="fieldset-array">
      <fieldset
        v-for="(item, ix) in array"
        :key="ix"
        class="fieldset-array-item"
        @keydown.enter.prevent
      >
        <div class="fieldset-array-item-card">
          <span class="remove-item">
            <b-tooltip :label="tooltipText" position="is-left" type="is-dark">
              <button class="delete" @click.prevent="openDialog(ix)" />
            </b-tooltip>
          </span>
          <slot :fieldset="item" />
        </div>
        <span
          v-if="ix === lastIx(array)"
          class="add-item tag is-white"
          @click="addFieldset"
        >
          Add another {{ lowercaseLabel }}..
        </span>
      </fieldset>
    </div>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers'

export default {
  mixins: [helpers],
  props: {
    array: {
      type: Array,
      required: true
    },
    fieldLabel: {
      type: String,
      default: ''
    },
    fieldset: {
      type: Object,
      required: true
    },
    fieldsetLabel: {
      type: String,
      default: ''
    }
  },
  computed: {
    label() {
      return this.fieldsetLabel
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
        onConfirm: () => this.handleConfirm(ix),
        title: `Remove ${this.lowercaseLabel}`
      })
    },
    removeFieldset(ix) {
      this.array.splice(ix, 1)
    }
  }
}
</script>

<style lang="scss">
.fieldset-array-wrap {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .fieldset-array {
    .fieldset-array-item {
      .fieldset-array-item-card {
        border: 1px solid #dbdbdb;
        border-radius: 0.25rem;
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        margin-top: 2rem;
        padding: 2rem 1.5rem;
        position: relative;
      }

      .remove-item {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        right: 0.75rem;
        top: 0.75rem;
      }

      .add-item {
        cursor: pointer;
        margin-top: 1rem;
        transition: all 300ms;
        &:hover {
          text-shadow: 1px 3px 9px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
