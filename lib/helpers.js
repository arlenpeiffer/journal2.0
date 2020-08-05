export const capitalize = string => {
  return string.slice(0, 1).toUpperCase() + string.slice(1)
}

export const checkLogForValue = (log, value) => {
  return log.find(i => i.toLowerCase() === value.toLowerCase().trim())
}

export const sort = arr => {
  return [...arr].sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1
  })
}

export const toArray = obj => {
  return Object.values(obj)
}
