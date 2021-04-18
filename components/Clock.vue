<template>
  <section class="">
    <p class="text-2xl text-bold text-gray-600" v-text="currentTime"></p>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      currentTime: null
    }
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format('HH:mm:ss')
    }
  },
  created() {
    this.currentTime = moment().format('HH:mm:ss')
    setInterval(() => this.updateCurrentTime(), 1 * 1000)
  }
}
</script>
<style scoped>
</style>