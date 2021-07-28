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
          'transition duration-600 ease-in transform hover:scale-125':
            getMarketIsOpen(item)
        }"
        class="
          market-card
          rounded-md
          bg-white
          border border-gray-100
          py-8
          px-8
          m-4
          shadow
        "
        @click="onClickMarket(item)"
      >
        <div
          class="
            flex
            text-2xl text-left
            tracking-wide
            overflow-ellipsis overflow-hidden
            text-gray-700
          "
        >
          <img
            :src="getMarketAvatar(item)"
            alt="market_avatar"
            class="h-auto w-8"
          />
          <span class="ml-4">{{ item.name }}</span>
        </div>

        <p class="text-left tracking-wide overflow-ellipsis overflow-hidden">
          <template v-if="getMarketIsOpen(item)">
            <span class="text-gray-500 text-sm">นับถอยหลัง</span><br />
            <client-only placeholder="loading...">
              <VueCountdown
                :time="getTimeRemaining(item)"
                v-slot="{ hours, minutes, seconds }"
              >
                <span class="text-xl text-grey-600">เหลือเวลาอีก</span><br />
                <span v-if="hours !== 0">{{ hours }} ชั่วโมง </span>
                <span v-if="minutes !== 0">{{ minutes }} นาที </span>
                <span v-if="seconds !== 0">{{ seconds }} วินาที</span>
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
  computed: {
    markets: function () {
      var openMarkets = []
      var closedMarkets = []
      this.allMarkets.forEach((m) => {
        if (this.getMarketIsOpen(m)) {
          openMarkets.push(m)
        } else {
          closedMarkets.push(m)
        }
      })
      return openMarkets.concat(closedMarkets)
    }
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
    const allMarkets = await $axios.$get(url)
    return { allMarkets }
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
    getTimeRemaining(market) {
      const onAirTime = this.getOnAirTime(market.onAirTimes)
      if (typeof onAirTime == 'undefined') {
        return 0
      }
      const startTime = moment(onAirTime.open)
      const endTime = moment(onAirTime.close)
      const currentTime = moment()
      if (currentTime.isBetween(startTime, endTime, '()')) {
        const remaining = endTime.diff(currentTime, 'seconds')
        return remaining * 1000
      } else {
        return 0
      }
    },
    getOnAirTime(onAirTimes) {
      const current = moment()
      const time = onAirTimes.find((o) => {
        const open = moment(o.open)
        const close = moment(o.close)
        if (current.isBetween(open, close, '()')) {
          return true
        } else {
          return false
        }
      })
      return time
    },
    getMarketIsOpen(item) {
      if (!item.isActive) {
        return false
      }
      const onAirTime = this.getOnAirTime(item.onAirTimes)
      if (typeof onAirTime == 'undefined') {
        return
      }
      const current = moment()
      const open = moment(onAirTime.open)
      const close = moment(onAirTime.close)
      if (current.isBetween(open, close, '()')) {
        return true
      } else {
        return false
      }
    },
    getMarketCardBGColor(item) {
      if (this.getMarketIsOpen(item)) {
        return item.color
      } else {
        return '#CBCBCB'
      }
    },
    getMarketAvatar(market) {
      const baseImageURL = process.env.BASE_IMAGE_URL
      if (typeof market.avatar === 'undefined') {
        return `/logos/logo.svg`
      } else {
        return `${baseImageURL}${market.avatar}`
      }
    }
  }
}
</script>

<style scoped>
.market-card {
  width: 320px;
  height: 250px;
}
</style>