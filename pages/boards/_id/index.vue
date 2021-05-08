<template>
  <div class="lg:p-8">
    <div class="flex flex-row gap-8">
      <div>
        <span class="font-extrabold text-2xl text-purple-600 py-3">
          {{ market.name }}
        </span>
      </div>
      <div>
        <client-only placeholder="loading...">
          <VueCountdown
            :time="getTimeRemaining()"
            v-slot="{ hours, minutes, seconds }"
          >
            <span class="text-xl text-grey-600">เหลือเวลาอีก</span>
            <span v-if="hours !== 0">{{ hours }} ชั่วโมง </span>
            <span v-if="minutes !== 0">{{ minutes }} นาที </span>
            <span v-if="seconds !== 0">{{ seconds }} วินาที</span>
          </VueCountdown>
        </client-only>
      </div>
    </div>
    <div class="m-4 grid lg:grid-cols-5 lg:gap-16 sm:grid-cols-1">
      <!-- // summary -->
      <Summary :lottos="lottos" />

      <!-- // calculated -->
      <div class="" v-if="calculated">
        <div class="grid grid-cols-5 gap-8 bg-purple-200">
          <div class="py-3 text-center">ประเภท</div>
          <div class="py-3 text-center">หมายเลข</div>
          <div class="py-3 text-center">ยอด</div>
        </div>
        <hr />
        <div class="divide-y-2 divide-purple-200 divide-solid">
          <div
            v-for="lotto in lottos"
            :key="lotto.id"
            class="grid grid-cols-5 gap-8"
          >
            <div class="py-3">{{ lotto.type }}</div>
            <div class="py-3">{{ lotto.number }}</div>
            <div class="py-3">{{ lotto.price }}</div>
          </div>
        </div>
      </div>
      <div class="col-span-2 sm:mt-16">
        <div class="bg-white">
          <nav class="flex flex-col sm:flex-row">
            <button
              v-on:click="toggleTabs(1)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 1,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 1
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              2 ตัว
            </button>
            <button
              v-on:click="toggleTabs(2)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 2,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 2
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              3 ตัว
            </button>
            <button
              v-on:click="toggleTabs(3)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 3,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 3
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              6 กลับ
            </button>
            <button
              v-on:click="toggleTabs(4)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 4,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 4
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              19 ประตู
            </button>
            <button
              v-on:click="toggleTabs(5)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 5,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 5
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              วิ่ง
            </button>
          </nav>
        </div>
        <div class="relative bg-indigo-200">
          <transition name="fade ">
            <TwoNumber
              v-show="openTab === 1"
              class="absolute"
              @numbers-submitted="onSubmittedNumbers"
            />
          </transition>
          <transition name="fade">
            <ThreeNumber v-show="openTab === 2" class="absolute" />
          </transition>
          <transition name="fade">
            <SixNumber v-show="openTab === 3" class="absolute" />
          </transition>
          <transition name="fade">
            <NineTeenNumber v-show="openTab === 4" class="absolute" />
          </transition>
          <transition name="fade">
            <OneNumber v-show="openTab === 5" class="absolute" />
          </transition>
        </div>
      </div>
      <div class="col-span-2"></div>
    </div>
  </div>
</template>
<script>
import ThreeNumber from '~/components/ThreeNumber'
import TwoNumber from '~/components/TwoNumber'
import SixNumber from '~/components/SixNumber'
import NineTeenNumber from '~/components/NineTeenNumber'
import OneNumber from '~/components/OneNumber.vue'
import Summary from '~/components/Summary.vue'
import moment from 'moment'
import VueCountdown from '@chenfengyuan/vue-countdown'
export default {
  components: {
    TwoNumber,
    ThreeNumber,
    SixNumber,
    NineTeenNumber,
    OneNumber,
    Summary,
    VueCountdown
  },
  async asyncData({ params, $axios }) {
    const slug = params.id
    const marketStatusURL = `${$axios.defaults.baseURL}/markets/status/${slug}`
    const url = `${$axios.defaults.baseURL}/markets/${slug}`
    try {
      await $axios.$get(marketStatusURL)
      const market = await $axios.$get(url)
      return { slug, market }
    } catch (e) {
      alert(`เกิดข้อผิดพลาดในการเล่นตลาดนี้  ${e.message}`)
      this.$router.replace('/boards')
    }
  },
  data() {
    return {
      calculated: false,
      openTab: 1,
      lottos: []
    }
  },
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    },
    toggleTabs(tabNumber) {
      this.openTab = tabNumber
    },
    onSubmittedNumbers(n) {
      console.log('lottos-before', this.lottos)
      this.lottos = this.lottos.concat(n)
      console.log('submit', n)
      console.log('lottos', this.lottos)
    },
    getTimeRemaining() {
      const openTime = this.market.openTime
      const closeTime = this.market.closeTime
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
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 1.25s ease;
}
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>