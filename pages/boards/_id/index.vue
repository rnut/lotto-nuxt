<template>
  <div class="p-8">
    <section class="flex flex-row gap-8">
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
    </section>
    <div class="flex">
      <main class="w-1/2">
        <!-- // creator -->
        <div class="border border-gray-500 rounded-md p-4 h-72 my-4 w-auto">
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

        <div v-if="lottos.length > 0">
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
        </div>
      </main>

      <section class="px-8 w-1/2">
        <div class="bg-purple-600 rounded">
          <table
            class="table-auto w-full"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <thead>
              <th></th>
              <th>bill no.</th>
              <th>market</th>
              <th>time</th>
              <th>volumn</th>
              <th>price</th>
              <th>discount</th>
              <th>actions</th>
            </thead>
            <tbody class="bg-purple-100">
              <template v-for="bill in bills">
                <tr
                  :key="bill._id"
                  class="z-0 text-purple-900 border-t-2 border-white"
                >
                  <td class="cursor-pointer" @click="onClickBill(bill)">
                    <img
                      src="/svg/expand_more_black_24dp.svg"
                      alt="Logo"
                      class="h-auto mx-auto"
                    />
                  </td>
                  <td>{{ bill._id }}</td>
                  <td>{{ bill.createdBy.username }}</td>
                  <td>{{ bill.createdBy.name }}</td>
                  <td>{{ getBillMarketName(bill) }}</td>
                  <td>
                    {{ bill.createdAt | humanDateTime }}
                  </td>
                  <td>{{ getBillVolume(bill) }}</td>
                  <td>{{ bill.totalPrice | currencies }}</td>
                  <td>{{ bill.totalDiscount | currencies }}</td>
                  <td>{{ bill.totalReward | currencies }}</td>
                  <td>
                    <span
                      :class="{
                        'text-red-500': getTotalSummaryBill(bill) < 0,
                        'text-green-700': getTotalSummaryBill(bill) > 0,
                        'text-gray-500': getTotalSummaryBill(bill) === 0
                      }"
                    >
                      {{ getTotalSummaryBill(bill) | currencies }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="p-2 rounded"
                      v-bind:class="{
                        'bg-red-500 text-white':
                          getBillStatus(bill) === 'รอการชำระเงิน',
                        'bg-yellow-200 text-gray-600':
                          getBillStatus(bill) === 'รอผล',
                        'bg-green-400 text-white':
                          getBillStatus(bill) === 'ประกาศผลแล้ว'
                      }"
                      >{{ getBillStatus(bill) }}</span
                    >
                  </td>
                  <td class="">
                    <div class="flex gap">
                      <button
                        v-if="!bill.isConfirmPayment"
                        @click="onClickDelete(bill)"
                        class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img
                          src="/svg/delete_white_24dp.svg"
                          alt="Logo"
                          class="h-auto mx-auto"
                        />
                      </button>

                      <button
                        v-if="!bill.isConfirmPayment"
                        @click="onClickConfirmPayment(bill)"
                        class="bg-green-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img
                          src="/svg/payments_white_24dp.svg"
                          alt="Logo"
                          class="h-auto mx-auto"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr :key="bill.id" v-if="expandedIDs.includes(bill._id)">
                  <td colspan="13">
                    <table
                      class="table-auto w-full bg-white border border-purple-400"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <thead class="bg-purple-400 rounded">
                        <th>ประเภท</th>
                        <th>หมายเลข</th>
                        <th>ยอด</th>
                        <th>เรทจ่าย</th>
                        <th>ส่วนลด</th>
                        <th>ยอดถูก</th>
                        <th>สถานะ</th>
                      </thead>

                      <tbody>
                        <tr v-for="lotto in bill.lottos" :key="lotto._id">
                          <td>{{ lotto.lotto.title }}</td>
                          <td>{{ lotto.number }}</td>
                          <td>{{ lotto.price | currencies }}</td>
                          <td>{{ lotto.lotto.reward | currencies }}</td>
                          <td>{{ lotto.totalDiscount | currencies }}</td>
                          <td>
                            <span
                              :class="{
                                'text-red-500': getLottoResultReward(lotto) < 0,
                                'text-green-700':
                                  getLottoResultReward(lotto) > 0,
                                'text-gray-500':
                                  getLottoResultReward(lotto) === 0
                              }"
                            >
                              {{ getLottoResultReward(lotto) | currencies }}
                            </span>
                          </td>
                          <td>{{ lotto.resultStatus }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>
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