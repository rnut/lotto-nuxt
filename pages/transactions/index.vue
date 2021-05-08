<template>
  <div>
    <div class="flex p-8 m-8 h-full shadow-lg">
      <div>
        <h1 class="font-bold text-gray-800">ระบุเงื่อนไขที่ต้องการค้นหา</h1>
      </div>
      <div class="my-2">
        <label for="date">
          <span class="text-sm text-gray-400">เวลา</span>
          <date-range-picker v-model="dateRange" opens="right">
            <!--    input slot (new slot syntax)-->
            <template #input="picker">
              {{ picker.startDate | date }} -
              {{ picker.endDate | date }}
            </template>
            <!--    date slot-->
            <template #date="data">
              <span class="small">{{ data.date | dateCell }}</span>
            </template>
            <!--    ranges (new slot syntax) -->
            <template #ranges="ranges">
              <div class="ranges">
                <ul>
                  <li
                    v-for="(range, name) in ranges.ranges"
                    :key="name"
                    @click="ranges.clickRange(range)"
                  >
                    <b>{{ name }}</b>
                    <small class="text-muted"
                      >{{ range[0].toDateString() }} -
                      {{ range[1].toDateString() }}</small
                    >
                  </li>
                </ul>
              </div>
            </template>
          </date-range-picker>
        </label>
      </div>
      <div class="my-2">
        <div class="">
          <SelectInput
            v-bind:sourceMarkets="markets"
            @onSubmitTags="onSubmitTags"
          />
          <button
            @click="onClickSearch"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          >
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- // table-content -->
    <section class="p-8">
      <h1 class="text-2xl py-4 font-bold text-purple-800">รายการแทง</h1>
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
            <th>reward</th>
            <th>summary</th>
            <th>status</th>
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
                <td>{{ getBillMarketName(bill) }}</td>
                <td>
                  {{ bill.createdAt | humanDateTime }}
                </td>
                <td>{{ getBillVolume(bill) }}</td>
                <td>{{ bill.totalPrice }}</td>
                <td>{{ bill.totalDiscount }}</td>
                <td>{{ bill.totalReward }}</td>
                <td>{{ bill.totalReward - bill.totalPrice }}</td>
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
                <td colspan="11">
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
                        <td>{{ lotto.price }}</td>
                        <td>{{ lotto.lotto.reward }}</td>
                        <td>{{ lotto.totalDiscount }}</td>
                        <td>{{ getLottoResultReward(lotto) }}</td>
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
</template>

<script>
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import SelectInput from '~/components/SelectInput.vue'
import TagInput from '~/components/TagInput.vue'
import { mapGetters } from 'vuex'
export default {
  components: { DateRangePicker, TagInput, SelectInput },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp
    return { markets }
  },
  data() {
    let startDate = new Date()
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 6)
    return {
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      bills: [],
      expandedIDs: [],
      filteredMarketIDs: []
    }
  },
  methods: {
    async onClickSearch() {
      this.bills = []
      const dateFormat = 'YYYY-MM-DD'
      const role = this.loggedInUser.role
      const url = `${this.$axios.defaults.baseURL}/bills/${role}`
      const startDate = moment(this.dateRange.startDate)
        .locale('th')
        .startOf('day')
        .format(dateFormat)
      const endDate = moment(this.dateRange.endDate)
        .locale('th')
        .endOf('day')
        .format(dateFormat)
      try {
        const queryParams = {
          startDate: startDate,
          endDate: endDate,
          markets: this.filteredMarketIDs
        }
        const resp = await this.$axios.get(url, { params: queryParams })
        this.bills = resp.data
      } catch (e) {
        console.log('e: ', e)
      }
    },
    getBillVolume(b) {
      if (typeof b.lottos === 'undefined') {
        return 'n/a'
      } else {
        return b.lottos.length
      }
    },
    getBillMarketName(b) {
      if (
        typeof b.marketRef !== 'undefined' &&
        b.marketRef !== null &&
        typeof b.marketRef.name !== 'undefined'
      ) {
        return b.marketRef.name
      } else {
        return 'n/a'
      }
    },
    getLottoResultReward(l) {
      if (l.resultStatus === 'win') {
        return l.price * l.lotto.reward
      } else {
        return 0
      }
    },
    getBillStatus(b) {
      if (b.isConfirmPayment) {
        return b.isChecked ? 'ประกาศผลแล้ว' : 'รอผล'
      } else {
        return 'รอการชำระเงิน'
      }
    },
    onClickBill(b) {
      const id = b._id
      if (this.expandedIDs.includes(id)) {
        this.expandedIDs = this.expandedIDs.filter(
          (expandedID) => id != expandedID
        )
      } else {
        this.expandedIDs.push(b._id)
      }
    },
    onSubmitTags(tags) {
      this.filteredMarketIDs = tags.map((t) => t._id)
      console.log('tags: ', tags)
    },
    async onClickDelete(b) {
      if (confirm('คุณต้องการลบบิลนี้ใช่หรือไม่?')) {
        try {
          const url = `${this.$axios.defaults.baseURL}/bills/${b._id}`
          await this.$axios.delete(url)
          this.bills = this.bills.filter((bill) => b._id !== bill._id)
        } catch (e) {
          alert('เกิดข้อผิดพลาด(10001)')
        }
      }
    },
    async onClickConfirmPayment(bill) {
      if (confirm('ยืนยันการชำระเงิน?')) {
        try {
          const url = `${this.$axios.defaults.baseURL}/bills/confirmPayment/${bill._id}`
          await this.$axios.patch(url)
          bill.isConfirmPayment = true
        } catch (e) {
          console.log('onClickConfirmPayment: ', e)
          if (e.response.status == 400) {
            alert(`เกิดข้อผิดพลาด(10002) ${e.response.data.message}`)
          }
        }
      }
    },
    updateValues() {},
    checkOpen() {}
  },
  filters: {
    dateCell(value) {
      let dt = new Date(value)
      return dt.getDate()
    },
    humanDateTime(value) {
      const date = moment(value).locale('th').format('ll')
      const time = moment(value).locale('th').format('LT')
      return `${date} ${time}`
    },
    date(value) {
      return moment(value).locale('th').format('ll')
    }
  }
}
</script>

<style scoped>
th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
}
td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 13px;
}
.slot {
  background-color: #aaa;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-black {
  color: #000;
}
</style>