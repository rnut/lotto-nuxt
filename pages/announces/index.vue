<template>
  <section>
    <div>
      <!-- // table-content -->
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <h1 class="text-2xl py-4 font-bold text-purple-800">จัดการตลาด</h1>
        </div>
        <div class="bg-purple-600 rounded">
          <table
            class="table-auto w-full"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th>รูปตลาด</th>
                <th class="text-start sortable">
                  <span>ชื่อตลาด</span>
                </th>
                <th class="text-center">สี</th>
                <th>
                  <span>เวลาเปิด</span><i aria-hidden="true" class=""></i>
                </th>
                <th><span>เวลาปิด</span><i aria-hidden="true" class=""></i></th>
                <th>
                  <span>action</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-purple-100 cursor-pointer">
              <tr v-for="market in markets" :key="market._id">
                <td>
                  <img
                    :src="getMarketAvatar(market)"
                    alt="market_avatar"
                    class="h-auto w-8 mx-auto shadow-md"
                  />
                </td>
                <td class="text-start">
                  {{ market.name }}
                </td>
                <td>
                  <div
                    class="py-3 px-3 rounded text-center"
                    :style="{ 'background-color': market.color }"
                  >
                    <p class="" :style="{ color: market.fontColor }">example</p>
                  </div>
                </td>
                <td class="text-start">
                  {{ market.openTime }}
                </td>
                <td class="text-start">
                  {{ market.closeTime }}
                </td>
                <td class="text-start">
                  <button type="button">
                    <nuxt-link :to="`/markets/results/${market._id}`">
                      <div
                        class="
                          bg-green-500
                          flex
                          items-center
                          px-3
                          py-2
                          rounded
                          hover:bg-green-700
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <rect fill="none" height="24" width="24" />
                          <path
                            d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M12,14 c-1.65,0-3-1.35-3-3V5h6v6C15,12.65,13.65,14,12,14z M19,8c0,1.3-0.84,2.4-2,2.82V7h2V8z"
                          />
                        </svg>
                        <span class="m-2 text-white"> รางวัล </span>
                      </div>
                    </nuxt-link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp
    return { markets }
  },
  methods: {
    async onChangeActive(m) {
      const activeStatus = !m.isActive
      const payload = {
        isActive: activeStatus
      }
      const url = `${this.$axios.defaults.baseURL}/markets/${m._id}`
      await this.$axios.$patch(url, payload)
      m.isActive = activeStatus
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