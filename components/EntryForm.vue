<template>
  <form>
    <!-- Diet -->
    <fieldset>
      <h2 class="title is-4">Diet</h2>
      <Dropdown
        v-model="diet.type"
        allow-reset
        include-footer
        label="Type"
        :options="logs.diets"
        placeholder="None"
        sorted
      >
        <AddToLogDropdown
          label="Add a diet"
          log-name="diets"
          mutation="ADD_DIET"
        />
      </Dropdown>
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="diet.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Supplements -->
    <fieldset>
      <h2 class="title is-4">Supplements</h2>
      <CheckboxList v-model="supplements" :list="logs.supplements" sorted />
      <AddToLogDropdown
        label="Add a supplement"
        log-name="supplements"
        mutation="ADD_SUPPLEMENT"
      />
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
      <CheckboxList v-model="mood" :list="logs.moods" sorted />
      <AddToLogDropdown
        label="Add a mood"
        log-name="moods"
        mutation="ADD_MOOD"
      />
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
      <RadioButtonGroup
        v-model="pain.level"
        label="Level"
        :options="levelOptions"
      />
      <b-field label="Notes" custom-class="is-small">
        <b-input v-model="pain.notes" placeholder="Notes" />
      </b-field>
    </fieldset>

    <!-- Stress -->
    <fieldset>
      <h2 class="title is-4">Stress</h2>
      <RadioButtonGroup
        v-model="stress.level"
        label="Level"
        :options="levelOptions"
      />
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
          spaced
          :value="sleep.rating"
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
          spaced
          :value="stomach.rating"
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
import AddToLogDropdown from '@/components/AddToLogDropdown'
import Autocomplete from '@/components/Autocomplete'
import CheckboxList from '@/components/CheckboxList'
import Dropdown from '@/components/Dropdown'
import FieldsetArray from '@/components/FieldsetArray'
import RadioButtonGroup from '@/components/RadioButtonGroup'

export default {
  components: {
    AddToLogDropdown,
    Autocomplete,
    CheckboxList,
    Dropdown,
    FieldsetArray,
    RadioButtonGroup
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
