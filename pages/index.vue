<template>
  <div class="w-full h-full p-16 overflow-auto"></div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
import Logo from '~/components/Logo'
import Clock from '~/components/Clock'
import { mapGetters } from 'vuex'
export default {
  components: {
    Clock,
    Logo,
    VueCountdown
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  created() {
    const role = this.loggedInUser.role
    this.$router.push(`/dashboard/${role}`)
  },
  middleware: 'auth'
}
</script>
