export default {
  methods: {
    formatHoursForDisplay(ms, label = 'hr') {
      const millisecondsInHour = 3600000
      const hours = ms / millisecondsInHour
      const hideInteger = hours > 0 && hours < 1

      let integer = Math.trunc(hours)
      const decimal = Number(hours - integer)

      const fraction = this.toFraction(decimal)
      integer = hideInteger ? '' : integer
      label = this.handlePlural(hours, label)

      return `${integer} ${fraction} ${label}`
    },
    handlePlural(count, word, suffix = 's') {
      const isPlural = count === 0 || count > 1
      return isPlural ? word + suffix : word
    },
    lastIx(arr) {
      return arr.length - 1
    },
    milliseconds(value, unit = 's') {
      const units = ['h', 'm', 's']
      if (units.includes(unit)) {
        const hours = unit === 'h' ? 60 : 1
        const minutes = unit !== 's' ? 60 : 1
        const seconds = 1000
        return value * hours * minutes * seconds
      } else {
        return 0
      }
    },
    toFraction(decimal) {
      switch (decimal) {
        case 0.25:
          return '¼'
        case 0.5:
          return '½'
        case 0.75:
          return '¾'
        default:
          return ''
      }
    }
  }
}
