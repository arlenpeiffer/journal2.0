<template>
  <form>
    <!-- Diet -->
    <fieldset>
      <h2 class="title is-4">Diet</h2>
      <b-field label="Type" custom-class="is-small">
        <b-select v-model="diet.type" expanded>
          <option :value="null">None</option>
          <option v-for="diet in logs.diets" :key="diet" :value="diet">
            {{ diet }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="diet.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Pain -->
    <fieldset>
      <h2 class="title is-4">Pain</h2>
      <!-- TODO: add label -->
      <b-field>
        <b-radio-button
          v-for="option in levelOptions"
          :key="option.value"
          v-model="pain.level"
          :native-value="option.value"
        >
          {{ option.label }}
        </b-radio-button>
      </b-field>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="pain.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Stress -->
    <fieldset>
      <h2 class="title is-4">Stress</h2>
      <!-- TODO: add label -->
      <b-field>
        <b-radio-button
          v-for="option in levelOptions"
          :key="option.value"
          v-model="stress.level"
          :native-value="option.value"
        >
          {{ option.label }}
        </b-radio-button>
      </b-field>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="stress.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Sleep -->
    <fieldset>
      <h2 class="title is-4">Sleep</h2>
      <b-field label="Amount" custom-class="is-small">
        <b-timepicker
          :v-bind="sleep.amount"
          :increment-minutes="15"
          :default-minutes="0"
          inline
          @input="setSleepAmount"
        />
      </b-field>
      <b-field label="Rating" custom-class="is-small">
        <b-rate
          :v-bind="sleep.rating"
          :value="sleep.rating"
          spaced
          @change="setSleepRating"
        />
      </b-field>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="sleep.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Stomach -->
    <fieldset>
      <h2 class="title is-4">Stomach</h2>
      <b-field label="Rating" custom-class="is-small">
        <b-rate
          :v-bind="stomach.rating"
          :value="stomach.rating"
          spaced
          @change="setStomachRating"
        />
      </b-field>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="stomach.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <b-button type="is-primary" @click="submitEntry">Submit</b-button>
  </form>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      default: () => ({
        diet: {
          type: null,
          notes: ''
        },
        pain: {
          level: null,
          notes: ''
        },
        sleep: {
          amount: null,
          rating: null, // ? or 0
          notes: ''
        },
        stomach: {
          rating: null, // ? or 0
          notes: ''
        },
        stress: {
          level: null,
          notes: ''
        }
      })
    }
  },
  data() {
    return {
      diet: this.entry.diet,
      pain: this.entry.pain,
      sleep: this.entry.sleep,
      stomach: this.entry.stomach,
      stress: this.entry.stress
    }
  },
  computed: {
    logs() {
      return this.$store.state.user.logs
    },
    levelOptions() {
      return [
        {
          label: 'None',
          value: 0
        },
        {
          label: 'Low',
          value: 1
        },
        {
          label: 'Moderate',
          value: 2
        },
        {
          label: 'High',
          value: 3
        },
        {
          label: 'Extreme',
          value: 4
        }
      ]
    }
  },
  methods: {
    setSleepAmount(date) {
      let [h, m] = date.toTimeString().slice(0, 5).split(':')
      h = Number(h)
      m = Number(m / 60)
      const amount = (h + m) * 3600000

      this.sleep.amount = amount
    },
    setSleepRating(rating) {
      rating === this.sleep.rating
        ? (this.sleep.rating = null)
        : (this.sleep.rating = rating)
    },
    setStomachRating(rating) {
      rating === this.stomach.rating
        ? (this.stomach.rating = null)
        : (this.stomach.rating = rating)
    },
    submitEntry() {
      console.log({ ...this.$data }) // or just console.log(this.$data) ?
    }
  }
}
</script>

<style>
form {
  padding: 0 1.5rem;
}

fieldset {
  margin: 3rem 0;
}
</style>
