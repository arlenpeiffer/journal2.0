export default {
  ADD_DIET: (state, diet) => {
    state.user.logs.diets = [...state.user.logs.diets, diet]
  },
  ADD_MOOD: (state, mood) => {
    state.user.logs.moods = [...state.user.logs.moods, mood]
  },
  ADD_SUPPLEMENT: (state, supplement) => {
    state.user.logs.supplements = [...state.user.logs.supplements, supplement]
  },
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
