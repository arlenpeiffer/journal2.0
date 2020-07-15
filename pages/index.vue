<template>
  <div class="section">
    <h1 class="title is-1">Welcome, please sign in.</h1>
    <form @submit.prevent="handleSubmit">
      <b-field label="Email">
        <b-input v-model="email" type="email" placeholder="Enter your email" />
      </b-field>
      <b-field label="Password">
        <b-input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          password-reveal
        />
      </b-field>
      <b-button type="is-primary" native-type="submit">Sign In</b-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    displayErrorMsg(error) {
      this.$buefy.snackbar.open({
        actionText: null,
        duration: 3000,
        message: error.message,
        position: 'is-top'
      })
    },
    handleSubmit() {
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error => this.displayErrorMsg(error))
    }
  }
}
</script>

// TODO: add debounced loading
