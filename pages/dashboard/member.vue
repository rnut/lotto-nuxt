<template>
  <div class="flex">
    <section id="filter-box" class="flex-2 p-8 h-full shadow-lg">
      <div class="flex flex-col">
        <h1 class="font-bold text-gray-800">ระบุเงื่อนไขที่ต้องการค้นหา</h1>
        <div class="my-2">
          <label for="date">
            <span class="text-sm text-gray-400">เวลา</span>
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

    <section class="p-8 flex-1">
      <h1 class="text-2xl py-4 font-bold text-purple-800">สรุปผล</h1>
      <div class="flex flex-col gap-8">
        <div class="bg-purple-400 rounded p-8">
          <p>
            <span class="text-6xl text-purple-700">รวมยอด</span>
            <span class="font-bold text-white text-9xl ml-8">
              {{ sumTotalPrice }}
            </span>
          </p>
        </div>

        <div class="bg-green-400 rounded p-8">
          <p>
            <span class="text-6xl text-green-700">รวมเงินรางวัล</span>
            <span class="font-bold text-white text-9xl ml-8">
              {{ sumTotalReward }}
            </span>
          </p>
        </div>

        <div class="bg-blue-400 rounded p-8">
          <p>
            <span class="text-6xl text-blue-700">รวมส่วนลด</span>
            <span class="font-bold text-white text-9xl ml-8">
              {{ sumTotalDiscount }}
            </span>
          </p>
        </div>
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
  components: { DateRangePicker, TagInput, SelectInput },
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp
    return { markets }
  },
  computed: {
    sumTotalPrice: function () {
      if (typeof this.summary === 'undefined' || this.summary === null) {
        return 'N/A'
      } else {
        console.log('this.summary', this.summary)
        return this.summary.sumTotalPrice
      }
    },
    sumTotalReward: function () {
      if (typeof this.summary === 'undefined' || this.summary === null) {
        return 'N/A'
      } else {
        return this.summary.sumTotalReward
      }
    },
    sumTotalDiscount: function () {
      if (typeof this.summary === 'undefined' || this.summary === null) {
        return 'N/A'
      } else {
        return this.summary.sumTotalDiscount
      }
    }
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
      summary: null,
      expandedIDs: [],
      filteredMarketIDs: []
    }
  },
  methods: {
    async onClickSearch() {
      this.summary = null
      const url = `${this.$axios.defaults.baseURL}/dashboard/member`
      try {
        const queryParams = {
          startDate: this.dateRange.startDate,
          endDate: this.dateRange.endDate,
          markets: this.filteredMarketIDs
        }
        const resp = await this.$axios.get(url, { params: queryParams })
        this.summary = resp.data
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
    }
  }
}
</script>

<style scoped>
</style>