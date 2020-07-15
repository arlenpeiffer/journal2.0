export default {
  async fetchUserData({ commit, state }) {
    const { id } = state.user
    const data = await this.$fireDb
      .ref(`users/${id}`)
      .once('value')
      .then(snapshot => snapshot.val())
    commit('SET_USER_DATA', data)
  },
  handleAuthStateChanged(context, { authUser }) {
    const { commit, dispatch, state } = context
    const isSignedIn = state.user
    return authUser
      ? dispatch('signIn', authUser.uid)
      : isSignedIn && commit('CLEAR_USER_DATA')
  },
  signIn({ commit, dispatch }, uid) {
    commit('SET_USER_ID', uid)
    this.$router.push('/dashboard')
    dispatch('fetchUserData')
  }
}
