<template lang="html">
  <div>
    <router-link to="/auth">Add Account</router-link>
    <h1>This is where you will Toot!</h1>
    <h2>Hello {{ $route.params.instance }} as {{ account.username }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mastodon from 'mastodon-api'
export default {

  data() {
    return {
      account: null
    }
  },

  created () {
    let mastodon = new Mastodon({
      api_url: this.instanceForRoute.instance + '/api/v1/',
      access_token: this.instanceForRoute.access_token
    })

    console.log(mastodon)

    mastodon.get('accounts/verify_credentials', {}, (err, account) => {
      this.account = account
    })
  },

  computed: {
    ...mapGetters(['instanceForRoute'])
  }
}
</script>

<style lang="css">
div {
  color: #fff;
}
</style>
