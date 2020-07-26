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

    <!-- Supplements -->
    <fieldset>
      <h2 class="title is-4">Supplements</h2>
      <CheckboxList v-model="supplements" :options="logs.supplements" />
    </fieldset>

    <!-- Appointments -->
    <fieldset>
      <h2 class="title is-4">Appointments</h2>
      <FieldsetArray
        v-slot="{ fieldset }"
        :array="appointments"
        :fieldset="appointmentFields"
        label="Appointment"
      >
        <Autocomplete
          v-model="fieldset.type"
          label="Type"
          :options="logs.appointments"
          placeholder="Appointment type (eg. Therapy, Rhuemetology)"
        />
        <Autocomplete
          v-model="fieldset.practitioner"
          label="Practitioner"
          :options="logs.practitioners"
          placeholder="Appointment practitioner name"
        />
        <b-field label="Notes" custom-class="is-small">
          <b-input v-model="fieldset.notes" placeholder="Appointment notes" />
        </b-field>
      </FieldsetArray>
    </fieldset>

    <!-- Mood -->
    <fieldset>
      <h2 class="title is-4">Mood</h2>
      <CheckboxList v-model="mood" :options="logs.moods" />
    </fieldset>

    <!-- Movement -->
    <fieldset>
      <h2 class="title is-4">Movement</h2>
      <FieldsetArray
        v-slot="{ fieldset }"
        :array="movement"
        :fieldset="movementFields"
        label="Movement"
      >
        <Autocomplete
          v-model="fieldset.type"
          label="Type"
          :options="logs.movement"
          placeholder="Movement type (eg. Swimming, Yoga)"
        />
        <b-field label="Notes" custom-class="is-small">
          <b-input v-model="fieldset.notes" placeholder="Movement notes" />
        </b-field>
      </FieldsetArray>
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

    <!-- Travel -->
    <fieldset>
      <h2 class="title is-4">Travel</h2>
      <b-field label="Be ye traveling?" custom-class="is-small">
        <b-switch v-model="travel.isTraveling" @input="setLocation">
          {{ isTravelingLabel }}
        </b-switch>
      </b-field>
      <b-field label="Where ya at?" custom-class="is-small">
        <b-input v-model="travel.location" :disabled="!travel.isTraveling" />
      </b-field>
    </fieldset>

    <!-- Notes -->
    <fieldset>
      <h2 class="title is-4">Notes</h2>
      <b-input
        v-model="notes"
        type="textarea"
        placeholder="Overall notes about the day.."
      />
    </fieldset>

    <b-button type="is-primary" @click="submitEntry">Submit</b-button>
  </form>
</template>

<script>
import Autocomplete from '@/components/Autocomplete'
import CheckboxList from '@/components/CheckboxList'
import FieldsetArray from '@/components/FieldsetArray'

export default {
  components: {
    Autocomplete,
    CheckboxList,
    FieldsetArray
  },
  props: {
    entry: {
      type: Object,
      default: () => ({
        appointments: [],
        diet: {
          type: null,
          notes: ''
        },
        mood: [],
        movement: [],
        notes: '',
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
        },
        supplements: [],
        travel: {
          isTraveling: false,
          location: 'Home'
        }
      })
    }
  },
  data() {
    return {
      appointments: this.entry.appointments,
      diet: this.entry.diet,
      mood: this.entry.mood,
      movement: this.entry.movement,
      notes: this.entry.notes,
      pain: this.entry.pain,
      sleep: this.entry.sleep,
      stomach: this.entry.stomach,
      stress: this.entry.stress,
      supplements: this.entry.supplements,
      travel: this.entry.travel
    }
  },
  computed: {
    appointmentFields() {
      return {
        type: '',
        practitioner: '',
        notes: ''
      }
    },
    isTravelingLabel() {
      return this.travel.isTraveling ? 'Yes' : 'No'
    },
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
    },
    movementFields() {
      return {
        type: '',
        notes: ''
      }
    }
  },
  methods: {
    setLocation(isTraveling) {
      isTraveling
        ? (this.travel.location = '')
        : (this.travel.location = 'Home')
    },
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
