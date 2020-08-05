<template>
  <b-collapse :open="false" class="add-to-log-dropdown" @open="reset">
    <div slot="trigger" slot-scope="{ open }" class="label">
      <b-icon :icon="setIcon(open)" />
      <span>{{ label }}</span>
    </div>
    <form class="dropdown" @submit.prevent="handleSubmit">
      <b-field :type="type" :message="error">
        <b-input v-model="value" />
      </b-field>
      <b-button
        type="is-primary"
        native-type="submit"
        :disabled="loading"
        :loading="loading"
      >
        Add
      </b-button>
    </form>
  </b-collapse>
</template>

<script>
import { mapGetters } from 'vuex'
import { capitalize, checkLogForValue, toArray } from '@/lib/helpers'

export default {
  props: {
    label: {
      type: String,
      default: 'Add new'
    },
    logName: {
      type: String,
      required: true
    },
    mutation: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      error: null,
      loading: false,
      value: ''
    }
  },
  computed: {
    firebaseRef() {
      return this.$fireDb.ref(`users/${this.userID}/logs/${this.logName}`)
    },
    log() {
      return this.logs[this.logName]
    },
    logNameSingular() {
      return this.logName.slice(0, -1)
    },
    type() {
      return this.error ? 'is-danger' : ''
    },
    ...mapGetters(['logs', 'userID'])
  },
  methods: {
    addToFirebaseSuccess(value) {
      this.$store.commit(this.mutation, value)
      this.notify(`${capitalize(this.logNameSingular)} added successfully!`)
    },
    addToFirebaseFailure() {
      this.notify(`There was an error adding the ${this.logNameSingular}`)
    },
    async handleAddToLog(value) {
      this.loading = true

      const log = await this.firebaseRef
        .once('value')
        .then(snapshot => toArray(snapshot.val()))
      const valueIsDuplicate = checkLogForValue(log, value)

      if (valueIsDuplicate) {
        this.addToFirebaseFailure()
      } else {
        this.firebaseRef
          .push(value)
          .then(this.addToFirebaseSuccess(value))
          .catch(this.addToFirebaseFailure)
      }

      this.loading = false
    },
    handleSubmit() {
      const trimmedValue = this.value.trim()
      const valueIsDuplicate = checkLogForValue(this.log, trimmedValue)
      const valueIsEmptyString = trimmedValue === ''

      if (valueIsEmptyString) {
        this.setError(`Please enter a ${this.logNameSingular} 🤗`)
        this.resetValue()
      } else if (valueIsDuplicate) {
        this.setError('I think that one already exists 🙃')
        this.resetValue()
      } else {
        this.setError(null)
        this.handleAddToLog(trimmedValue)
        this.resetValue()
      }
    },
    notify(msg) {
      this.$buefy.toast.open(msg)
    },
    reset() {
      this.setError(null)
      this.resetValue()
    },
    resetValue() {
      this.value = ''
    },
    setError(msg) {
      this.error = msg
    },
    setIcon(open) {
      return open ? 'chevron-down' : 'plus'
    }
  }
}
</script>

<style lang="scss">
.add-to-log-dropdown {
  .label {
    cursor: pointer;
    display: inline-flex;
    & > :first-child {
      margin-right: 0.25rem;
    }
  }
  .dropdown {
    display: flex;
    padding: 0;
    & > :first-child {
      margin-right: 0.5rem;
    }
  }
}
</style>
