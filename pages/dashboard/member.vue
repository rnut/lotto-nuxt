<template>
  <div class="flex flex-row gap-4">
    <section id="filter-box" class="lg:p-8 m-8 h-full shadow-lg">
      <div class="flex flex-col">
        <h1 class="font-bold text-gray-800">ระบุเงื่อนไขที่ต้องการค้นหา</h1>
        <div class="my-2">
          <label for="date">
            <span class="text-sm text-gray-400">เวลา</span>
            <date-range-picker v-model="dateRange">
              <!--    input slot (new slot syntax)-->
              <template #input="picker">
                {{ picker.startDate | date }} - {{ picker.endDate | date }}
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
          <SelectInput
            v-bind:sourceMarkets="markets"
            @onSubmitTags="onSubmitTags"
          />
        </div>
        <button
          @click="onClickSearch"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        >
          ค้นหา
        </button>
      </div>
    </section>

    <section class="flex-grow lg:p-8">
      <h1 class="text-2xl py-4 font-bold text-purple-800">Subscriptions</h1>
      <div class="bg-purple-600 rounded">
        <table
          class="table-auto w-full"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >
          <thead>
            <th>bill no.</th>
            <th>market</th>
            <th>open-close</th>
            <th>volumn</th>
            <th>price</th>
            <th>discount</th>
            <th>reward</th>
            <th>summary</th>
            <th>status</th>
          </thead>
          <tbody class="bg-purple-100">
            <template v-for="bill in bills">
              <tr
                :key="bill._id"
                class="cursor-pointer text-purple-900 border-t-2 border-white hover:bg-gray-100"
                @click="onClickBill(bill)"
              >
                <td>{{ bill._id }}</td>
                <td>{{ bill.marketRef.name }}</td>
                <td>
                  {{
                    `${bill.marketRef.openTime} - ${bill.marketRef.closeTime}`
                  }}
                </td>
                <td>{{ bill.lottos.length }}</td>
                <td>{{ bill.totalPrice }}</td>
                <td>{{ bill.totalDiscount }}</td>
                <td>{{ bill.totalReward }}</td>
                <td>{{ bill.totalReward - bill.totalPrice }}</td>
                <td>{{ bill.isChecked ? 'ประกาศผลแล้ว' : 'รอผล' }}</td>
              </tr>
              <tr :key="bill.id" v-if="expandedIDs.includes(bill._id)">
                <td colspan="10">
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
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import SelectInput from '~/components/SelectInput.vue'
import TagInput from '~/components/TagInput.vue'
export default {
  components: { DateRangePicker, TagInput, SelectInput },
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
      filteredMarketIDs: [],
      startDate: '2021-04-01',
      endDate: '2021-04-30'
    }
  },
  methods: {
    async onClickSearch() {
      const url = `${this.$axios.defaults.baseURL}/bills/member`
      try {
        const queryParams = {
          startDate: this.startDate,
          endDate: this.endDate,
          markets: this.filteredMarketIDs
        }
        const resp = await this.$axios.get(url, { params: queryParams })
        this.bills = resp.data
      } catch (e) {
        console.log('e: ', e)
      }
    },
    getLottoResultReward(l) {
      if (l.resultStatus === 'win') {
        return l.price * l.lotto.reward
      } else {
        return 0
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
      console.log('tags: ', tags)
    },
    updateValues() {},
    checkOpen() {}
  },
  filters: {
    dateCell(value) {
      let dt = new Date(value)

      return dt.getDate()
    },
    date(val) {
      console.log('val: ', val)
      console.log('val.toLocaleString: ', val.toLocaleString())
      return val ? val.toLocaleString() : ''
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