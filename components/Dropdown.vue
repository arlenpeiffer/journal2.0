<template>
  <b-field :label="label" custom-class="is-small">
    <b-dropdown
      expanded
      max-height="150px"
      :mobile-modal="false"
      scrollable
      :value="value"
    >
      <!-- dropdown trigger  -->
      <b-select
        slot="trigger"
        expanded
        :placeholder="displayValue"
        class="dropdown-trigger"
      />
      <!-- dropdown options -->
      <div class="dropdown-options">
        <b-dropdown-item
          v-if="allowReset"
          :value="null"
          @click="setValue(null)"
        >
          {{ placeholder }}
        </b-dropdown-item>
        <b-dropdown-item
          v-for="option in optionsList"
          :key="option"
          :value="option"
          @click="setValue(option)"
        >
          {{ option }}
        </b-dropdown-item>
      </div>
      <!-- dropdown footer -->
      <div v-if="includeFooter" class="dropdown-footer">
        <slot />
      </div>
    </b-dropdown>
  </b-field>
</template>

<script>
import { sort } from '@/lib/helpers'

export default {
  props: {
    allowReset: {
      type: Boolean,
      default: false
    },
    includeFooter: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    sorted: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, Number, String],
      default: null
    }
  },
  computed: {
    displayValue() {
      return this.value || this.placeholder
    },
    optionsList() {
      return this.sorted ? sort(this.options) : this.options
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
.dropdown {
  .dropdown-trigger {
    select {
      color: #363636;
    }
  }
  .dropdown-options {
    & > :focus {
      background: whitesmoke;
      color: #0a0a0a;
      outline: none;
    }
  }
  .dropdown-footer {
    background: whitesmoke;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    padding: 20px 1rem;
    position: absolute;
    top: 152px;
    width: 100%;
  }
}
</style>
