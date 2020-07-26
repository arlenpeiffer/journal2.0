export const sort = arr => {
  return [...arr].sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1
  })
}
