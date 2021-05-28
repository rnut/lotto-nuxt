<template>
  <section class="p-8">
    <div class="flex gap-4 items-center">
      <h1 class="text-2xl py-4 font-bold text-purple-800">
        เทรนด์การเล่นของตลาด : {{ lottoResult.marketRef.name }}
      </h1>
    </div>
    <div v-if="trends && trends.length > 0" class="flex flex-row gap-8">
      <div class="w-80 p-4">
        <nav class="flex flex-col shadow-lg">
          <p class="font-thin mb-4">กรุณาเลือกประเภทที่ต้องการดูเทรนด์</p>
          <button
            v-for="(tab, index) in tabs"
            :key="tab.title"
            v-on:click="toggleTabs(index)"
            v-bind:class="{
              'text-purple-800 bg-white': openTab !== index,
              'bg-purple-600 border-b-4 border-purple-300 text-white':
                openTab === index
            }"
            class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
          >
            {{ tab }}
          </button>
        </nav>
      </div>
      <aside class="flex-grow lg:p-8">
        <div class="bg-purple-600 rounded">
          <table
            class="table-auto w-full"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th class="table-header">
                  <span>ลำดับ</span>
                </th>
                <th class="table-header">
                  <span>เลข</span>
                </th>
                <th class="table-header">
                  <span>มูลค่ารวม</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="activeTrend" class="bg-purple-100">
              <template v-for="(trend, index) in activeTrend.lottos">
                <tr
                  :key="trend.title"
                  class="cursor-pointer text-purple-900 border-t-2 border-white hover:bg-gray-100"
                >
                  <td class="table-content">{{ index }}</td>
                  <td class="table-content">{{ trend.number }}</td>
                  <td class="table-content">{{ trend.sumOfPrice }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </aside>
    </div>

    <div v-else class="flex flex-col">
      <img src="/svg/Empty-bro.svg" alt="empty" class="h-96 w-full" />
      <p class="text-center text-2xl">ไม่พบการทำรายการ</p>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const resultID = params.id
    const url = `${$axios.defaults.baseURL}/lottoResults/trends/${resultID}`
    const resp = await $axios.$get(url)
    const trends = resp.trends
    const lottoResult = resp.lottoResult
    var activeTrend = null
    if (trends && trends.length > 0) {
      activeTrend = trends[0]
    } else {
      activeTrend = null
    }
    return { trends, lottoResult, activeTrend }
  },
  data() {
    return {
      openTab: 0
    }
  },
  computed: {
    tabs: function () {
      return this.trends.map((t) => t.title)
    }
  },
  methods: {
    toggleTabs(tabIndex) {
      this.openTab = Math.min(tabIndex, this.trends.length)
      this.activeTrend = this.trends[this.openTab]
    }
  }
}
</script>