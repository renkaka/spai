<template>
  <div id="app">
    <v-header v-if="$route.meta.header"></v-header>
    <router-view />
  </div>
</template>
<script>
import header from './views/header'
export default {
  name: 'app',
  components: {
    'v-header': header
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
</style>
