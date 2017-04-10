<template lang="html">

</template>

<script>
export default {
  props: ['mastodon'],

  created () {
    // console.log(this.mastodon)
    this.mastodon.get('timelines/home', {})
      .then(resp => console.log(resp.data))
  }
}
</script>

<style lang="css">
</style>
