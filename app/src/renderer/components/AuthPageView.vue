<template>
	<div class="authenticator">

		<div class="box instance" v-if="client_id === null && client_secret === null">
			<p>Enter your instance domain</p>
			<input type="text" v-model="instance_url">

			<button @click="requestAuthLink()">Connect <span v-if="instance_url"> to {{ instance_url }}</span></button>
		</div>

		<div class="box code" v-if="client_id !== null && client_secret !== null && access_token === null">
			<p>Enter code after logging in</p>
			<input type="text" v-model="auth_code">
			<button @click="useAuthCode" :disabled="auth_code === null">Continue</button>
		</div>

		<div class="box info" v-if="access_token !== null">
			<p>Your access token is: {{ access_token }}</p>
		</div>

	</div>
</template>

<script>
const { shell, ipcRenderer } = require('electron')
import Mastodon from 'mastodon-api'
export default {

  name: 'auth-page',

  data () {
    return {
      instance_url: 'https://mastodon.social',
      client_id: null,
      client_secret: null,
      auth_code: null,
      auth_url: null,
      access_token: null
    }
  },

  methods: {
    useAuthCode () {
      Mastodon.getAccessToken(this.client_id, this.client_secret, this.auth_code, this.instance_url)
			.catch(err => console.error(err))
			.then((access_token) => {
  this.access_token = access_token
  ipcRenderer.send('token-received', {
    access_token: access_token,
    instance: this.instance_url,
    client_id: this.client_id,
    client_secret: this.client_secret
  })

  this.$store.dispatch('ADD_INSTANCE', {
    access_token: access_token,
    instance: this.instance_url
  })

  this.$router.push({
    name: 'instance-page',
    params: {
      instance: this.instance_url
    }
  })
})
    },

    requestAuthLink () {
      Mastodon.createOAuthApp(`${this.instance_url}/api/v1/apps`, 'mastodon-node')
				.catch(err => console.error(err))
				.then((res) => {
  console.log(res)
  this.client_id = res.client_id
  this.client_secret = res.client_secret

  return Mastodon.getAuthorizationUrl(res.client_id, res.client_secret, `${this.instance_url}`)
})
				.then(data => {
  console.log(data)
  shell.openExternal(data.url)
  this.auth_url = data.url
})
    }
  }
}
</script>

<style lang="scss">
.authenticator {
	height: 100%;
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: Lato, Helvetica, sans-serif;
	justify-content: center;

	.box {
		background: #313543;
		padding: 20px;
		border-radius: 4px;
		width: 500px;

		p {
			color: #fff;
			margin-bottom: 15px;
			font-size: 20px;
			text-align: center;
		}

		input[type='text'] {
			padding: 8px 10px;
			outline-width: 0;
			border: 0;
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
			width: 100%;
			text-align: center;
			font-size: 18px;
		}

		button {
			background: #2588d0;
			font-size: 14px;
			padding: 10px 20px;
			color: #fff;

			&:hover {
				cursor: pointer;
				background: darken(#2588d0, 10%);
			}
			// text-transform: uppercase;
			border-bottom-left-radius: 3px;
			border-bottom-right-radius: 3px;
			border: 0px;
			margin: 0 auto;
			display: block;
			width: 100%;
		}
	}
}
</style>
