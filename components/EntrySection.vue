<template>
  <fieldset>
    <h2 v-if="title" class="title is-4">{{ title }}</h2>
    <slot />
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss"></style>
