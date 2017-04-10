<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  computed: {

  },

  created () {

    // Tell the main process that the Vue application has loaded and ask it
    // to retrieve the saved instance information.
    // If there are instances, go to the first one found, otherwise
    // the send user to the authentication page.
    ipcRenderer.send('vue-loaded', {})
    ipcRenderer.on('instances-retrieve', (event, arg) => {
      console.log(arg.length)
      if(arg.length === 0) {
        this.$router.go('/auth')
      } else {
        this.$store.dispatch('RETRIEVE_INSTANCES', arg)
        this.$router.push({ name: 'instance-page', params: { instance: arg[0].instance } })
      }
    })

  }
}
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app { height: 100%; }

  body {
    background: #191b22;
  }

  a {
    color: #d9e1e8;
    &:hover {
      color: darken(#d9e1e8, 20%);
    }
  }

</style>
