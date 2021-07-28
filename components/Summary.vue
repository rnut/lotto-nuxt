<template>
  <div class="my-8">
    <!-- // calculated -->
    <div class="p-4 rounded border border-gray-200" v-if="calculated">
      <p class="font-bold text-center"><span>ใบเสร็จ</span><br /></p>
      <div class="flex flex-col justify-between mb-4">
        <div>
          <span class="text-xs text-gray-600 font-bold">ตลาด: </span>
          {{ market.name }}
        </div>
        <div>
          <span class="text-xs text-gray-600 font-bold">เวลา: </span>
          {{ calculatedAt | humanDateTime }}
        </div>
      </div>

      <table
        class="table-auto w-full"
        cellpadding="0"
        cellspacing="0"
        border="0"
      >
        <thead>
          <tr>
            <th>
              <span class="text-gray-500 font-bold underline">ประเภท</span>
            </th>
            <th>
              <span class="text-gray-500 font-bold underline">หมายเลข</span>
            </th>
            <th><span class="text-gray-500 font-bold underline">ยอด</span></th>
            <th>
              <span class="text-gray-500 font-bold underline">เรทจ่าย</span>
            </th>
            <th>
              <span class="text-gray-500 font-bold underline">ส่วนลด</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="calculatedLotto in calculatedLottos"
            :key="calculatedLotto.id"
          >
            <td>
              <span class="">{{ calculatedLotto.lotto.title }} </span>
            </td>
            <td>
              <span class=""> {{ calculatedLotto.number }} </span><br />
            </td>
            <td>
              <span class=""> {{ calculatedLotto.price | currencies }} </span>
            </td>
            <td>
              <span class="">
                {{ calculatedLotto.lotto.reward | currencies }}
              </span>
            </td>
            <td>
              <span class="">
                {{ calculatedLotto.totalDiscount | currencies }}
              </span>
            </td>
          </tr>

          <tr>
            <td colspan="5" class="p-0">
              <div class="flex border border-gray-200 p-2 mb-3">
                <label
                  class="block w-full text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="memo"
                >
                  บันทึกช่วยจำ
                  <input
                    readonly
                    type="text"
                    id="memo"
                    v-model="memo"
                    class="
                      bg-gray-200
                      rounded
                      w-full
                      text-gray-700
                      focus:outline-none
                      border-b-4 border-gray-300
                      focus:border-purple-600
                      transition
                      duration-500
                      p-4
                    "
                  />
                </label>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="total"
                >
                  ยอดรวม
                  <input
                    readonly
                    type="text"
                    id="total"
                    :value="totalPrice"
                    class="
                      disabled:opacity-50
                      bg-gray-200
                      rounded
                      w-full
                      text-gray-700
                      focus:outline-none
                      border-b-4 border-gray-300
                      focus:border-purple-600
                      transition
                      duration-500
                      p-4
                    "
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        @click="onConfirmBill"
        class="
          w-full
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
      >
        ยืนยัน
      </button>

      <button
        @click="onCancel"
        class="
          w-full
          mt-4
          bg-white
          hover:bg-red-500
          text-red-700
          hover:text-white
          font-bold
          py-2
          rounded
          hover:shadow-xl
          transition
          duration-200
        "
      >
        ยกเลิก
      </button>
    </div>

    <section v-else>
      <div class="p-4 bg-purple-600 flex justify-between">
        <span class="text-xl text-white">บิลใหม่</span>
        <button
          @click="onSubmitBill"
          class="
            flex
            rounded
            text-white
            bg-green-500
            px-4
            py-1
            hover:bg-green-700
          "
        >
          <span> บันทึกบิล </span>
        </button>
      </div>
      <table
        class="table-auto w-full"
        cellpadding="0"
        cellspacing="0"
        border="0"
      >
        <tbody>
          <tr v-for="(lotto, index) in lottos" :key="index" class="bg-gray-200">
            <td>
              <span class="text-xl">{{ lotto.title }} </span>
            </td>
            <td>
              <span class=""> {{ lotto.subtitle }} </span><br />
              <span class="text-lg"> {{ lotto.detail }} </span>
            </td>
            <td>
              <span
                class="p-1 m-1 text-lg rounded bg-purple-100"
                v-for="number in lotto.numbers"
                :key="number.data"
              >
                {{ number.data }}
              </span>
            </td>
            <td>
              <button
                @click="onDeleteLotto(index)"
                class="
                  flex
                  justify-center
                  items-center
                  w-12
                  h-12
                  rounded-full
                  border border-red-400
                  hover:border-2 hover:border-red-800
                  hover:bg-red-100
                "
              >
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#C70039"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
                    />
                  </svg>
                </p>
              </button>
            </td>
          </tr>
          <tr class="bg-gray-50">
            <td colspan="4" class="p-0">
              <div class="flex border border-gray-200 p-2">
                <label
                  class="block w-full text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="memo"
                >
                  บันทึกช่วยจำ
                  <input
                    type="text"
                    id="memo"
                    v-model="memo"
                    class="
                      bg-gray-200
                      rounded
                      w-full
                      text-gray-700
                      focus:outline-none
                      border-b-4 border-gray-300
                      focus:border-purple-600
                      transition
                      duration-500
                      p-4
                    "
                  />
                </label>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="total"
                >
                  ยอดรวม
                  <input
                    readonly
                    type="text"
                    id="total"
                    :value="totalPrice"
                    class="
                      disabled:opacity-50
                      bg-gray-200
                      rounded
                      w-full
                      text-gray-700
                      focus:outline-none
                      border-b-4 border-gray-300
                      focus:border-purple-600
                      transition
                      duration-500
                      p-4
                    "
                  />
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: ['lottos', 'market'],
  data() {
    return {
      respCalculated: null,
      memo: '',
      calculated: false
    }
  },
  computed: {
    totalPrice: function () {
      var total = 0
      this.lottos
        .map((l) => l.lottos)
        .flat()
        .flat()
        .forEach((element) => {
          total = total + parseInt(element.price)
        })
      var formatter = new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      return formatter.format(total)
    },
    calculatedAt: function () {
      if (
        typeof this.respCalculated === 'undefined' ||
        this.respCalculated === null
      ) {
        return 'n/a'
      } else {
        return this.respCalculated.createdAt
      }
    },
    calculatedLottos: function () {
      if (
        typeof this.respCalculated === 'undefined' ||
        this.respCalculated === null
      ) {
        return []
      } else {
        return this.respCalculated.lottos
      }
    }
  },
  methods: {
    async onSubmitBill() {
      try {
        if (typeof this.lottos === 'undefined') {
          throw new Error('88000')
        }
        if (this.lottos.length === 0) {
          throw new Error('88001')
        }
        const flatLottos = this.lottos
          .map((l) => l.lottos)
          .flat()
          .flat()
        const payload = {
          marketID: this.market._id,
          lottos: flatLottos,
          memo: this.memo
        }
        const url = `${this.$axios.defaults.baseURL}/bills`
        const resp = await this.$axios.$post(url, payload)
        this.respCalculated = resp
        this.calculated = true
        this.$emit('onSummarySaved', this.calculatedLottos)
      } catch (e) {
        this.respCalculated = null
        this.calculated = false
        alert(`เกิดข้อผิดพลาด ${e.message}`)
        this.$emit('onSummaryCanceled')
      }
    },
    onCancel() {
      if (confirm('ยืนยันการยกเลิก?')) {
        this.$emit('onSummaryCanceled')
        this.respCalculated = null
      }
    },
    onDeleteLotto(index) {
      this.lottos.splice(index, 1)
    },
    async onConfirmBill() {
      try {
        const billID = this.respCalculated._id
        const url = `${this.$axios.defaults.baseURL}/bills/confirm/${billID}`
        const bill = await this.$axios.$patch(url)
        this.$emit('onConfirmedBill', bill.data)
      } catch (e) {
        alert(`เกิดข้อผิดพลาด (30000) ${e.message}`)
        this.$emit('onSummaryCanceled')
      }
    }
  },
  filters: {
    humanDateTime(value) {
      const date = moment(value).locale('th').format('ll')
      const time = moment(value).locale('th').format('LT')
      return `${date} ${time}`
    },
    currencies(value) {
      if (typeof value !== 'number') {
        return 'n/a'
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
</style>