<template>
  <div class="w-full h-full p-16 overflow-auto">
    <h1 class="text-xl font-bold">ตลาด</h1>
    <h2 class="text-sm font-bold">เลือกตลาดที่ต้องการเล่น</h2>
    <section class="flex flex-row flex-wrap items-center">
      <button
        v-for="item in markets"
        :key="item.id"
        v-bind:style="{ 'background-color': getMarketCardBGColor(item) }"
        :class="{
          'transition duration-600 ease-in transform hover:scale-125': getMarketIsOpen(
            item
          )
        }"
        class="market-card rounded-md bg-white border border-gray-100 py-8 px-8 m-4 shadow"
        @click="onClickMarket(item)"
      >
        <p
          class="text-2xl text-left tracking-wide overflow-ellipsis overflow-hidden text-gray-700"
        >
          {{ item.name }}
        </p>

        <p class="text-left tracking-wide overflow-ellipsis overflow-hidden">
          <template v-if="getMarketIsOpen(item)">
            <span class="text-gray-500 text-sm">นับถอยหลัง</span><br />
            <client-only placeholder="loading...">
              <VueCountdown
                :time="getTimeRemaining(item.openTime, item.closeTime)"
                v-slot="{ hours, minutes, seconds }"
              >
                <span class="text-xl text-grey-600">เหลือเวลาอีก</span><br />
                <span>
                  {{ hours }} ชั่วโมง {{ minutes }} นาที {{ seconds }} วินาที
                </span>
              </VueCountdown>
            </client-only>
          </template>
          <template v-else>
            <span class="text-gray-500 text-2xl font-bold">ตลาดปิด</span><br />
          </template>
        </p>
      </button>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import VueCountdown from '@chenfengyuan/vue-countdown'
export default {
  middleware: 'auth',
  components: {
    VueCountdown
  },
  data() {
    return {
      items: [],
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    }
  },
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/boards`
    const markets = await $axios.$get(url)
    return { markets }

    return {}
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    async onClickMarket(item) {
      const url = `${this.$axios.defaults.baseURL}/markets/status/${item._id}`
      try {
        await this.$axios.$get(url)
        this.$router.push(`/boards/${item._id}`)
      } catch (e) {
        alert('ตลาดนี้ยังไม่พร้อมใช้งาน')
      }
    },
    getTimeRemaining(openTime, closeTime) {
      const timeFormat = 'HH:mm'
      const startTime = moment(openTime, timeFormat)
      const endTime = moment(closeTime, timeFormat)
      const currentTime = moment()
      const started = currentTime.isAfter(startTime)
      const ended = currentTime.isAfter(endTime)
      const remaining = endTime.diff(currentTime, 'seconds')
      if (started && !ended) {
        return remaining * 1000
      } else {
        return 0
      }
    },
    getMarketIsOpen(item) {
      return this.getTimeRemaining(item.openTime, item.closeTime) > 0
    },
    getMarketCardBGColor(item) {
      if (this.getMarketIsOpen(item)) {
        return item.color
      } else {
        return '#CBCBCB'
      }
    }
  }
}
</script>

<style scoped>
.market-card {
  width: 290px;
  height: 250px;
}
</style>