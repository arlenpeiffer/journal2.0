<template>
  <form id="entry-form">
    <!-- Date -->
    <EntrySection title="Date">
      <DatePicker v-model="date" />
    </EntrySection>

    <!-- Diet -->
    <EntrySection title="Diet">
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
      <Input v-model="diet.notes" label="Notes" placeholder="Notes" />
    </EntrySection>

    <!-- Meals -->
    <EntrySection title="Meals">
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
          <Input
            v-model="fieldset.name"
            label="Name"
            placeholder="Meal item name"
          />
          <Input
            v-model="fieldset.portion"
            label="Portion"
            placeholder="Meal item portion"
          />
          <ChipInput
            v-model="fieldset.ingredients"
            label="Ingredients"
            :options="logs.ingredients"
            placeholder="Meal item ingredients"
          />
          <Input
            v-model="fieldset.notes"
            label="Notes"
            placeholder="Meal item notes"
          />
        </FieldsetArray>
        <Input
          v-model="fieldset.notes"
          label="Notes"
          placeholder="Meal notes"
        />
      </FieldsetArray>
    </EntrySection>

    <!-- Supplements -->
    <EntrySection title="Supplements">
      <CheckboxList v-model="supplements" :list="logs.supplements" sorted />
      <AddToLogDropdown
        label="Add a supplement"
        log-name="supplements"
        mutation="ADD_SUPPLEMENT"
      />
    </EntrySection>

    <!-- Appointments -->
    <EntrySection title="Appointments">
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
        <Input
          v-model="fieldset.notes"
          label="Notes"
          placeholder="Appointment notes"
        />
      </FieldsetArray>
    </EntrySection>

    <!-- Mood -->
    <EntrySection title="Mood">
      <CheckboxList v-model="mood" :list="logs.moods" sorted />
      <AddToLogDropdown
        label="Add a mood"
        log-name="moods"
        mutation="ADD_MOOD"
      />
    </EntrySection>

    <!-- Movement -->
    <EntrySection title="Movement">
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
        <Input
          v-model="fieldset.notes"
          label="Notes"
          placeholder="Movement notes"
        />
      </FieldsetArray>
    </EntrySection>

    <!-- Pain -->
    <EntrySection title="Pain">
      <RadioButtonGroup
        v-model="pain.level"
        label="Level"
        :options="levelOptions"
      />
      <Input v-model="pain.notes" label="Notes" placeholder="Notes" />
    </EntrySection>

    <!-- Stress -->
    <EntrySection title="Stress">
      <RadioButtonGroup
        v-model="stress.level"
        label="Level"
        :options="levelOptions"
      />
      <Input v-model="stress.notes" label="Notes" placeholder="Notes" />
    </EntrySection>

    <!-- Sleep -->
    <EntrySection title="Sleep">
      <b-field label="Amount" custom-class="is-small">
        <b-timepicker
          :v-bind="sleep.amount"
          :increment-minutes="15"
          :default-minutes="0"
          inline
          @input="setSleepAmount"
        />
      </b-field>
      <Rating v-model="sleep.rating" label="Rating" />
      <Input v-model="sleep.notes" label="Notes" placeholder="Notes" />
    </EntrySection>

    <!-- Stomach -->
    <EntrySection title="Stomach">
      <Rating v-model="stomach.rating" label="Rating" />
      <Input v-model="stomach.notes" label="Notes" placeholder="Notes" />
    </EntrySection>

    <!-- Travel -->
    <EntrySection title="Travel">
      <b-field label="Be ye traveling?" custom-class="is-small">
        <b-switch v-model="travel.isTraveling" @input="setLocation">
          {{ isTravelingLabel }}
        </b-switch>
      </b-field>
      <Input
        v-model="travel.location"
        :disabled="!travel.isTraveling"
        label="Where ya at?"
      />
    </EntrySection>

    <!-- Notes -->
    <EntrySection title="Notes">
      <Input
        v-model="notes"
        type="textarea"
        placeholder="Overall notes about the day.."
      />
    </EntrySection>

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
import EntrySection from '@/components/EntrySection'
import FieldsetArray from '@/components/FieldsetArray'
import Input from '@/components/Input'
import RadioButtonGroup from '@/components/RadioButtonGroup'
import Rating from '@/components/Rating'

export default {
  components: {
    AddToLogDropdown,
    Autocomplete,
    CheckboxList,
    ChipInput,
    DatePicker,
    Dropdown,
    EntrySection,
    FieldsetArray,
    Input,
    RadioButtonGroup,
    Rating
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
    submitEntry() {
      console.log({ ...this.$data }) // or just console.log(this.$data) ?
    }
  }
}
</script>

<style lang="scss">
#entry-form {
  padding: 0 1.5rem;
  & > :not(:last-child) {
    margin: 3rem 0;
  }
}
</style>
