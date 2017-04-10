<template lang="html">
  <div class="home-toots">

    <div class="toot" v-for="toot in toots" v-if="toots">
      <div v-html="toot.content"></div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['mastodon'],

  data () {
    return {
      toots: []
    }
  },

  created () {
    // console.log(this.mastodon)
    this.mastodon.get('timelines/home', {})
      .then(resp => {
        resp.data.forEach(data => {
          console.log(data)
        })
        this.toots = resp.data
      })
  }
}
</script>

<style lang="scss">
.home-toots {
  display: flex;
  flex-direction: column;
}
.toot {
  padding: 8px 10px;
  padding-left: 68px;
  position: relative;
  min-height: 48px;
  cursor: default;
}
</style>
