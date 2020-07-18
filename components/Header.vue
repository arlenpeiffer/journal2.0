<template>
  <header class="hero is-warning">
    <div class="hero-body level">
      <span class="level-left level-item title is-1" :style="{ margin: 0 }">
        ༼ つ ◕_◕ ༽つ
      </span>
      <nav v-if="signedIn" class="level-right">
        <nuxt-link to="/dashboard" class="level-item">
          Dashboard
        </nuxt-link>
        <b-button type="is-light" class="level-item" inverted @click="signOut">
          Sign Out
        </b-button>
      </nav>
      <h1 v-else class="title is-2">journal2.0</h1>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    signedIn() {
      return !!this.$store.state.user
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style></style>
