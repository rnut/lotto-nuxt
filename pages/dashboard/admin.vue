<template>
  <div class="flex flex-row gap-4 p-4">
    <section id="filter-box" class="flex-2 p-8 h-full shadow-lg">
      <div class="flex flex-col">
        <h1 class="font-bold text-gray-800">ระบุเงื่อนไขที่ต้องการค้นหา</h1>
        <div class="my-2">
          <label for="date">
            <span class="text-sm text-gray-400 block">เวลา</span>
            <date-range-picker v-model="dateRange" opens="right">
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
          <label for="market">
            <span class="text-sm text-gray-400 block">ตลาด</span>
            <SelectInput
              v-bind:sourceMarkets="markets"
              @onSubmitTags="onSubmitTags"
            />
          </label>
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
      <h1 class="text-2xl py-4 font-bold text-purple-800">สรุป</h1>
      <div class="bg-purple-600 rounded">
        <table
          class="table-auto w-full"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >
          <thead>
            <tr>
              <th class="table-header" v-for="h in headers" :key="h">
                <span>{{ h }}</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-purple-100">
            <template v-for="bill in bills">
              <tr
                :key="bill._id"
                class="cursor-pointer text-purple-900 border-t-2 border-white hover:bg-gray-100"
                @click="onClickBill(bill)"
              >
                <td class="table-content">{{ bill.username }}</td>
                <td class="table-content">{{ bill.name }}</td>
                <td class="table-content">
                  <span>{{ bill.sumTotalPrice | currencies }}</span>
                </td>
                <td class="table-content">
                  {{ bill.sumTotalDiscount | currencies }}
                </td>
                <td class="table-content">
                  {{ bill.sumTotalReward | currencies }}
                </td>
                <td class="table-content">
                  <span
                    class="text-lg"
                    :class="{
                      'text-red-500': getSummary(bill) < 0,
                      'text-green-700': getSummary(bill) > 0,
                      'text-gray-500': getSummary(bill) === 0
                    }"
                  >
                    {{ getSummary(bill) | currencies }}
                  </span>
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
export default {
  middleware: 'auth',
  components: { DateRangePicker, TagInput, SelectInput },
  data() {
    let startDate = new Date()
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 6)
    return {
      headers: ['ยูเซอร์เนม', 'ชื่อเล่น', 'ยอด', 'ส่วนลด', 'รางวัล', 'รวม'],
      dateRange: {
        startDate: startDate,
        endDate: endDate
      },
      bills: [],
      expandedIDs: [],
      filteredMarketIDs: []
    }
  },
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp
    return { markets }
  },
  methods: {
    async onClickSearch() {
      const url = `${this.$axios.defaults.baseURL}/dashboard/admin`
      try {
        const queryParams = {
          startDate: this.dateRange.startDate,
          endDate: this.dateRange.endDate,
          markets: this.filteredMarketIDs
        }
        const resp = await this.$axios.get(url, { params: queryParams })
        this.bills = resp.data
      } catch (e) {}
    },
    getSummary(b) {
      return b.sumTotalReward - (b.sumTotalPrice - b.sumTotalDiscount)
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
      this.filteredMarketIDs = tags.map((t) => t._id)
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
      return val ? moment(val).locale('th').format('ll') : ''
    },
    currencies(value) {
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return formatter.format(value)
    }
  }
}
</script>

<style scoped>
th {
  color: black;
  text-transform: uppercase;
}
td {
  color: black;
}
.table-header {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
}

.table-content {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 13px;
}
</style>