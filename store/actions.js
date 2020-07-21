export default {
  async fetchUserData({ state }) {
    const { id } = state.user
    const data = await this.$fireDb
      .ref(`users/${id}`)
      .once('value')
      .then(snapshot => snapshot.val())
    return data
  },
  async formatUserData({ dispatch }, data) {
    const journal = await dispatch('formatJournal', data.journal)
    const logs = await dispatch('formatLogs', data.logs)
    return {
      journal,
      logs
    }
  },
  formatJournal(ctx, data) {
    const journal = Object.values(data).map(entry => {
      return {
        appointments: entry.appointments || [],
        date: entry.date,
        food: {
          diet: entry.food.diet,
          meals: entry.food.meals || []
        },
        id: entry.key,
        mood: entry.mood || [],
        movement: entry.movement || [],
        notes: entry.notes,
        pain: entry.pain,
        sleep: entry.sleep,
        stomach: entry.stomach,
        stress: entry.stress,
        supplements: entry.supplements || [],
        travel: entry.travel
      }
    })
    return journal
  },
  formatLogs(ctx, data) {
    const logs = {}
    for (const key in data) {
      logs[key] = Object.values(data[key])
    }
    return logs
  },
  handleAuthStateChanged(context, { authUser }) {
    const { commit, dispatch, state } = context
    const isSignedIn = state.user
    return authUser
      ? dispatch('signIn', authUser.uid)
      : isSignedIn && commit('CLEAR_USER_DATA')
  },
  async signIn({ commit, dispatch }, uid) {
    commit('SET_USER_ID', uid)
    this.$router.push('/dashboard')
    const data = await dispatch('fetchUserData')
    const formattedData = await dispatch('formatUserData', data)
    commit('SET_USER_DATA', formattedData)
  },
  signOut() {
    this.$fireAuth.signOut()
    this.$router.push('/')
  }
}
