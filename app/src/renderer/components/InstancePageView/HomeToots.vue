<template lang="html">
  <div class="home-toots">

    <div class="toot" v-for="toot in toots" v-if="toots">
      <div v-html="toot.content"></div>
    </div>

  </div>
</template>

<script>
import cheerio from 'cheerio'
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

        // TODO: Figure out how to replace links.
        // let data = resp.data.map(data => {
        //   const $ = cheerio.load(data.content)
        //   $('a.mention').each((i, el) => {
        //     let $el = $(el)
        //     const link = $el.attr('href')
        //     // const replacement = $el.hasClass('tag')
        //     //   ? `<router-link :to="{ name: 'tag-view', params: { id: '${link}' } }">${$el.text()}</router-link>`
        //     //   : `<router-link :to="{ name: 'profile-view', params: { id: '${link}' } }">${$el.text()}</router-link>`
        //
        //     const replacement = `<a @click="console.log('HELLO!')">${$el.text()}</a>`
        //
        //     $el.replaceWith(replacement)
        //     return $el.html()
        //   })
        //
        //   console.log($.html())
        //
        //   data.content = $.html()
        //   return data
        // })

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
