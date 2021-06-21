    <template>
  <section>
    <div>
      <!-- // table-content -->
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <h1 class="text-2xl py-4 font-bold text-purple-800">
            ประกาศรางวัล {{ market.name }}
          </h1>
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
                <th>
                  <span>เริ่มรอบ</span>
                </th>
                <th>
                  <span>จบรอบ</span>
                </th>
                <!-- <th>
                      <span>สถานะ</span>
                    </th> -->
                <!-- <th>
                      <span>ประการศผลโดย</span>
                    </th> -->
                <th>
                  <span>actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-purple-100 cursor-pointer">
              <tr
                class=""
                v-for="onAirTime in market.onAirTimes"
                :key="onAirTime._id"
              >
                <td>{{ formatTime(onAirTime.open) }}</td>
                <td>{{ formatTime(onAirTime.close) }}</td>
                <!-- <td>
                      <span
                        class="p-2 rounded-xl"
                        v-bind:class="{
                          'bg-yellow-200': !lottoResult.isConfirmed,
                          'bg-green-300': lottoResult.isConfirmed
                        }"
                      >
                        {{
                          lottoResult.isConfirmed
                            ? 'ประกาศผลแล้ว'
                            : 'รอประกาศผล'
                        }}
                      </span>
                    </td> -->
                <!-- <td>
                      <span>
                        {{ getConfirmedBy(lottoResult) }}
                      </span>
                    </td> -->
                <td>
                  <button type="button" v-on:click="onClickAnnounce(onAirTime)">
                    <div
                      class="
                        bg-purple-500
                        flex
                        items-center
                        px-3
                        py-2
                        rounded
                        hover:bg-purple-700
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#ffffff"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"
                        />
                      </svg>
                      <span class="m-2 text-white">ประกาศรางวัล</span>
                    </div>
                  </button>

                  <button type="button" v-if="false">
                    <nuxt-link :to="`/markets/trends/${onAirTime._id}`">
                      <div
                        class="
                          bg-blue-500
                          flex
                          items-center
                          px-3
                          py-2
                          rounded
                          hover:bg-blue-700
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"
                          />
                        </svg>
                        <span class="m-2 text-white">เทรนด์การเล่น</span>
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
import moment from 'moment'
export default {
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/markets/results/${slug}`
    const resp = await $axios.$get(url)
    const market = resp.market
    const lottoResults = resp.lottoResults
    return { slug, market, lottoResults }
  },
  methods: {
    formatTime(l) {
      return moment(l).locale('th').format('LLL')
    },
    getConfirmedBy(l) {
      if (typeof l.updatedBy === 'undefined') {
        return 'n/a'
      } else {
        return l.updatedBy.name
      }
    },
    onClickAnnounce(onAirTime) {
      let lottoResult = this.lottoResults.find((l) => {
        const createdAt = moment(l.createdAt)
        const open = moment(onAirTime.open)
        return createdAt.isSame(open, 'day')
      })
      if (typeof lottoResult == 'undefined') {
        alert('ไม่พบข้อมูลการประกาศรางวัล กรุณาติดต่อผู้ดูแลระบบ (20002)')
        return
      } else {
        this.$router.push(`/markets/results/new/${lottoResult._id}`)
      }
    },
    async onSave(e) {
      const m = this.market
      const slug = m._id
      const url = `${this.$axios.defaults.baseURL}/markets/${slug}`
      const payload = {
        color: m.color,
        name: m.name,
        openTime: m.openTime,
        closeTime: m.closeTime
      }
      e.preventDefault()
      try {
        await this.$axios.patch(url, payload)
        this.$router.push({ path: '/markets' })
      } catch (e) {
        alert('เกิดข้อผิดพลาด(20001)')
      }
    },
    async onDelete() {
      if (confirm(`ยืนยันการลบข้อมูลผู้ใช้งาน ${m.name}`)) {
        await this.delete(m._id)
      }
    },
    async delete(id) {
      const url = `${this.$axios.defaults.baseURL}/markets/${id}`
      try {
        await this.$axios.delete(url)
        this.$router.replace({ name: 'markets' })
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    }
  }
}
</script>