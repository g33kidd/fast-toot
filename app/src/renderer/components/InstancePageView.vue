<template lang="html">
  <div class="instance-view">
    <!-- <router-link to="/auth">Add Account</router-link>
    <h1>This is where you will Toot!</h1>
    <h3>{{ $route.params.instance }}</h3>
    <h2 v-if="account">Welcome, @{{ account.username }}</h2> -->

    <home-toots class="home-toots" :mastodon="mastodon" v-if="mastodon" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mastodon from 'mastodon-api'

import HomeToots from './InstancePageView/HomeToots'
export default {

  components: {
    HomeToots
  },

  data() {
    return {
      account: null,
      mastodon: null
    }
  },

  created () {
    if (typeof this.instanceForRoute === 'undefined') {
      this.$router.go('/instances')
    }

    if(typeof this.instanceForRoute !== 'undefined') {
      this.mastodon = new Mastodon({
        api_url: this.instanceForRoute.instance + '/api/v1/',
        access_token: this.instanceForRoute.access_token
      })

      this.mastodon.get('accounts/verify_credentials', {}, (err, account) => {
        this.account = account
      })
    }
  },

  computed: {
    ...mapGetters(['instanceForRoute'])
  }
}
</script>

<style lang="scss">
.instance-view {
  display: flex;
  color: #fff;

  .home-toots {
    flex: 1;
  }
}
</style>
