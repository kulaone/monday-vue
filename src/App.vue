<template>
  <mondayBody />
</template>

<script>
import MondayBody from './components/MondayBody.vue'

export default {
  name: 'App',
  components: {
    MondayBody
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: rgb(23, 23, 52);
  margin-top: 60px;
}
</style>
