<template lang="html">
  <div class="instance-list">
    <div class="instance" v-for="instance in instances">
      <router-link :to="{name: 'instance-page', params: {instance: instance.instance}}">{{ instance.instance }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['instances'])
  }
}
</script>

<style lang="scss">
.instance-list {
  display: flex;
  flex-direction: column;

  .instance {
    background: #313543;
  }
}
</style>
