<template>
  <div id="app">
    <app-nav-bar></app-nav-bar>
    <router-view/>
  </div>
</template>

<script>
import AppNavBar from './components/AppNavBar'

export default {
  components: {AppNavBar},
  name: 'App'
}
</script>
