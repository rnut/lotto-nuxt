<template>
  <div class="w-full h-full p-16 overflow-auto"></div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'
import Logo from '~/components/Logo'
import Clock from '~/components/Clock'
export default {
  components: {
    Clock,
    Logo,
    VueCountdown
  },
  data() {
    return {}
  },
  methods: {},
  middleware: 'auth'
}
</script>
