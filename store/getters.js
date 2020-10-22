export default {
  journal: state => {
    return state.user.journal
  },
  logs: state => {
    return state.user.logs
  },
  userID: state => {
    return state.user.id
  }
}
