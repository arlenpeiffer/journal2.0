<template>
  <form>
    <!-- Date -->
    <fieldset>
      <h2 class="title is-4">Date</h2>
      <DatePicker v-model="date" />
    </fieldset>

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

    <!-- Meals -->
    <fieldset>
      <h2 class="title is-4">Meals</h2>
      <FieldsetArray
        v-slot="{ fieldset }"
        :array="meals"
        :fieldset="mealFields"
        fieldset-label="Meal"
      >
        <RadioButtonGroup
          v-model="fieldset.type"
          label="Type"
          :options="mealTypes"
        />
        <b-field label="Time" custom-class="is-small">
          <b-timepicker
            v-model="fieldset.time"
            :default-minutes="0"
            editable
            hour-format="12"
            icon="clock"
          />
        </b-field>
        <FieldsetArray
          v-slot="{ fieldset }"
          :array="fieldset.items"
          field-label="Items"
          :fieldset="mealItemFields"
          fieldset-label="Item"
        >
          <b-field label="Name" custom-class="is-small">
            <b-input v-model="fieldset.name" placeholder="Meal item name" />
          </b-field>
          <b-field label="Portion" custom-class="is-small">
            <b-input
              v-model="fieldset.portion"
              placeholder="Meal item portion"
            />
          </b-field>
          <ChipInput
            v-model="fieldset.ingredients"
            label="Ingredients"
            :options="logs.ingredients"
            placeholder="Meal item ingredients"
          />
          <b-field label="Notes" custom-class="is-small">
            <b-input v-model="fieldset.notes" placeholder="Meal item notes" />
          </b-field>
        </FieldsetArray>
        <b-field label="Notes" custom-class="is-small">
          <b-input v-model="fieldset.notes" placeholder="Meal notes" />
        </b-field>
      </FieldsetArray>
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
        fieldset-label="Appointment"
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
        fieldset-label="Movement"
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
import { mapGetters } from 'vuex'
import AddToLogDropdown from '@/components/AddToLogDropdown'
import Autocomplete from '@/components/Autocomplete'
import CheckboxList from '@/components/CheckboxList'
import ChipInput from '@/components/ChipInput'
import DatePicker from '@/components/DatePicker'
import Dropdown from '@/components/Dropdown'
import FieldsetArray from '@/components/FieldsetArray'
import RadioButtonGroup from '@/components/RadioButtonGroup'

export default {
  components: {
    AddToLogDropdown,
    Autocomplete,
    CheckboxList,
    ChipInput,
    DatePicker,
    Dropdown,
    FieldsetArray,
    RadioButtonGroup
  },
  props: {
    entry: {
      type: Object,
      default: () => ({
        appointments: [],
        date: new Date(),
        food: {
          diet: {
            type: null,
            notes: ''
          },
          meals: []
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
      date: this.entry.date,
      diet: this.entry.food.diet,
      meals: this.entry.food.meals,
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
    mealFields() {
      return {
        type: null,
        time: null,
        items: [],
        notes: ''
      }
    },
    mealItemFields() {
      return {
        name: '',
        portion: '',
        ingredients: [],
        notes: ''
      }
    },
    mealTypes() {
      return [
        {
          label: 'Breakfast',
          value: 0
        },
        {
          label: 'Lunch',
          value: 1
        },
        {
          label: 'Dinner',
          value: 3
        },
        {
          label: 'Snack',
          value: 2
        },
        {
          label: 'Dessert',
          value: 4
        }
      ]
    },
    movementFields() {
      return {
        type: '',
        notes: ''
      }
    },
    ...mapGetters(['logs'])
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
