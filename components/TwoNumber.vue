<template>
  <div class="">
    <div class="border border-gray-800 pt-8 pb-16 px-8 mx-2 my-8 rounded-lg">
      <div class="grid grid-cols-4 gap-4 my-4">
        <div class="col-span-2">
          <label class="block" for="priceBon">
            <span class="text-gray-700 text-sm">เลข 2 ตัว</span>
            <div
              class="rounded bg-gray-50 border border-gray-200 shadow-md p-4 flex flex-row flex-wrap activeNumbers"
            >
              <div
                v-for="item in activeNumbers"
                :key="item.data"
                class="p-2 m-2 bg-red-200 rounded text-2xl tag"
              >
                {{ item.data }}
              </div>
            </div>
          </label>
        </div>
        <div>
          <div class="flex flex-col">
            <div class="flex-1">
              <label class="block my-1" for="priceBon">
                <span class="text-gray-700 text-sm inline-block w-full"
                  >บน</span
                >
                <input
                  v-model="bonPrice"
                  name="priceBon"
                  id="priceBon"
                  type="number"
                  class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                  placeholder="ราคาบน"
                />
              </label>
            </div>
            <div class="flex-1">
              <label class="block" for="priceLang">
                <span class="text-gray-700 text-sm inline-block w-full"
                  >ล่าง</span
                >
                <input
                  v-model="langPrice"
                  name="priceLang"
                  id="priceLang"
                  type="number"
                  class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                  placeholder="ราคาล่าง"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="flex flex-col pt-7 items-start">
          <button
            @click="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 w-10/12 h-16 rounded self-center"
          >
            ยืนยัน
          </button>

          <button
            @click="reset"
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 m-2 w-10/12 h-16 rounded self-center"
          >
            รีเซ็ต
          </button>
        </div>
      </div>
      <p class="text-sm text-red-900 bg-red-200">
        {{ activeNumberError }}
      </p>

      <input
        type="number"
        id="editor"
        class="editor rounded text-xl shadow-md p-4 border border-indigo-200"
        placeholder="ใส่ตัวเลขที่ต้องการ"
        v-model="activeNumber"
        @keypress="isNumber($event)"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bonPrice: Number,
      langPrice: Number,
      activeNumber: Number,
      activeNumbers: [],
      activeNumberError: ''
    }
  },
  watch: {
    activeNumber: function (val, oldVal) {
      const inputLenght = String(val).length
      if (inputLenght === 2) {
        const isDuplicated = this.checkDuplicatedActiveNumber(val)
        if (isDuplicated) {
          this.activeNumberError = 'เลขซ้ำนะจ๊ะ'
        } else {
          this.activeNumberError = ''
          this.activeNumbers.push({ data: val })
        }
        this.activeNumber = null
      }
    }
  },
  methods: {
    reset() {
      this.bonPrice = null
      this.langPrice = null
      this.activeNumber = null
      this.activeNumbers = []
      this.activeNumberError = ''
    },
    submit() {
      const lottos = this.activeNumbers.map((number) => {
        return [
          {
            type: 'char2bon',
            number: number.data,
            price: this.bonPrice
          },
          {
            type: 'char2lang',
            number: number.data,
            price: this.langPrice
          }
        ]
      })
      const emitDatas = lottos.flat()
      this.$emit('numbers-submitted', emitDatas)
      this.reset()
    },
    isNumber(evt) {
      this.activeNumberError = ''
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    checkDuplicatedActiveNumber(val) {
      const duplicated = this.activeNumbers.filter((obj) => {
        return obj.data === val
      })
      return duplicated.length > 0
    }
  }
}
</script>

<style>
.activeNumbers {
  min-height: 170px;
  max-height: 170px;
  overflow-y: scroll;
}
.tag {
  max-height: 52px;
}
.editor {
  width: 100%;
  min-height: 100px;
  cursor: text;
}
</style>