export default {
  CLEAR_USER_DATA: state => {
    state.user = null
  },
  SET_USER_DATA: (state, data) => {
    state.user = {
      ...state.user,
      ...data
    }
  },
  SET_USER_ID: (state, uid) => {
    state.user = {
      id: uid
    }
  }
}
