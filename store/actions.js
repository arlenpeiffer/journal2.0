export default {
  handleAuthStateChanged(context, { authUser }) {
    const { commit, dispatch, state } = context
    const isSignedIn = state.user

    return authUser
      ? dispatch('signIn', authUser.uid)
      : isSignedIn && commit('CLEAR_USER_DATA')
  },
  signIn({ commit }, uid) {
    commit('SET_USER_ID', uid)
    this.$router.push('/dashboard')
  }
}
