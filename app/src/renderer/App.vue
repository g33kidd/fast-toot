<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  created () {

  }
}
</script>

<style>
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

</style>
