<template>
  <section>
    <main
      class="bg-white max-w-3xl mx-auto md:p-12 my-10 rounded-lg shadow-2xl"
    >
      <section class="flex justify-between">
        <p class="text-gray-600 pt-2">
          <span class="font-bold text-2xl">ประกาศรางวัล</span>
          <span v-if="canSubmit" class="text-sm"
            >กรุณากรอกข้อมูลให้ครบถ้วน แล้วกดบันทึก</span
          >
        </p>
        <button type="button" v-if="canAnnounce" @click="onAnnounce">
          <button
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
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
              />
            </svg>
            <span class="m-2 text-white"> ประกาศรางวัล </span>
          </button>
        </button>
      </section>

      <section
        v-bind:style="{ 'background-color': lottoResult.marketRef.color }"
        class="
          p-4
          mt-3
          kkp-3
          rounded-lg
          flex
          justify-between
          items-center
          gap-16
        "
      >
        <p class="">
          <span class="text-xs text-gray-500">ชื่อตลาด: </span><br />
          <span class="text-2xl mx-2 text-gray-800">
            {{ lottoResult.marketRef.name }}
          </span>
        </p>
        <p class="">
          <span class="text-xs text-gray-500">รอบ </span><br />
          <span class="text-lg mx-2 text-gray-800">
            {{ getRound(lottoResult) }}
          </span>
        </p>
        <p class="">
          <span class="text-xs text-gray-500">เวลาเปิด: </span><br />
          <span class="text-2xl mx-2 text-gray-800">
            {{ lottoResult.marketRef.openTime }}
          </span>
        </p>
        <p class="">
          <span class="text-xs text-gray-500">เวลาปิด: </span><br />
          <span class="text-2xl mx-2 text-gray-800">
            {{ lottoResult.marketRef.closeTime }}
          </span>
        </p>
      </section>

      <section class="">
        <form class="flex flex-col" autocomplete="off" @submit="onSave">
          <div
            class="mb-6 pt-3 mt-4 rounded bg-gray-200"
            v-for="result in lottoResult.results"
            :key="result._id"
          >
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="name"
            >
              {{ result.lotto.title }}
            </label>
            <LottoResultInput
              :inactive="lottoResult.isConfirmed"
              :lottoResult="result"
              @onSubmitResult="onSubmitResult"
            />
          </div>
          <template v-if="canSubmit">
            <button
              class="
                mb-2
                bg-purple-600
                hover:bg-purple-700
                text-white
                font-bold
                py-2
                rounded
                shadow-lg
                hover:shadow-xl
                transition
                duration-200
              "
              type="submit"
            >
              บันทึก
            </button>
          </template>
          <template v-else>
            <p class="text-red-800 font-bold">
              บิลนี้ถูกประกาศผลเรียบร้อยแล้ว กรุณาติดต่อผู้ดูแลระบบ เพื่อแก้ไข
            </p>
          </template>
        </form>
      </section>
    </main>
  </section>
</template>

<script>
import moment from 'moment'
import LottoResultInput from '~/components/LottoResultInput.vue'
export default {
  components: { LottoResultInput },
  computed: {
    canSubmit: function () {
      return !this.lottoResult.isConfirmed
    },
    canAnnounce: function () {
      return this.canSubmit && this.savedAtLeastOne
    }
  },
  data() {
    return {
      savedAtLeastOne: false
    }
  },
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/lottoResults/${slug}`
    const resp = await $axios.$get(url)
    const lottoResult = resp.lottoResult
    return { slug, lottoResult }
  },
  methods: {
    onSubmitResult(e) {},
    getRound(l) {
      return moment(l.createdAt).locale('th').format('ll')
    },
    async onSave(e) {
      if (!this.checkIsCompleteResults(this.lottoResult)) {
        return alert('กรุณาใส่ผลรางวัลให้ครบถ้วน')
      }
      e.preventDefault()
      const url = `${this.$axios.defaults.baseURL}/lottoResults/${this.slug}`
      var payload = this.lottoResult
      delete payload._id
      try {
        await this.$axios.$patch(url, payload)

        alert(
          'บันทึกผลการประกาศรางวัลเรียบร้อย คุณสามารถประกาศผลได้โดยกดปุ่ม ประกาศผล '
        )
        this.savedAtLeastOne = true
      } catch (error) {
        alert(`เกิดข้อผิดพลาด (90001) ${error.message}`)
        this.savedAtLeastOne = false
      }
    },
    async onAnnounce() {
      const url = `${this.$axios.defaults.baseURL}/lottoResults/confirm/${this.slug}`
      try {
        const resp = await this.$axios.$patch(url)
        this.lottoResult = resp.lottoResult
        const billCount = resp.bills.length
        alert(`ประกาศผลเรียบร้อยแล้ว มีบิลที่ถูกคำนวณจำนวน ${billCount} บิล`)
      } catch (error) {
        alert(`เกิดข้อผิดพลาด (90002) ${error.message}`)
      }
    },
    checkIsCompleteResults(l) {
      const emptyResults = l.results.filter((data) => {
        return data.result.length == 0
      })
      return emptyResults.length === 0
    }
  }
}
</script>
<style scoped>
</style>