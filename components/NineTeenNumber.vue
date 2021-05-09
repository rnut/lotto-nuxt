<template>
  <div class="">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-2">
        <div
          class="rounded bg-gray-50 border border-gray-200 shadow-md mt-2 p-4 flex flex-row flex-wrap activeNumbers"
        >
          <div class="tag-input">
            <div
              v-for="(item, index) in activeNumbers"
              :key="item.data"
              class="tag-input__tag p-2 m-2 bg-red-200 rounded text-2xl tag cursor-pointer"
              @click="removeNumber(index)"
            >
              {{ item.data }}
            </div>
            <input
              v-model="activeNumber"
              type="text"
              placeholder="ระบุตัวเลข"
              class="tag-input__text"
              @keypress="isNumber($event)"
              @keydown.delete="removeLastNumber"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-col">
          <div class="flex-1">
            <label class="block" for="priceBon">
              <span class="text-gray-700 text-sm inline-block w-full">บน</span>
              <input
                name="priceBon"
                v-model="bonPrice"
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
                name="priceLang"
                v-model="langPrice"
                id="priceLang"
                type="number"
                class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                placeholder="ราคาล่าง"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <button
          @click="reset"
          class="text-red-500 hover:text-white hover:bg-red-700 text-white py-2 px-4 m-2 w-10/12 h-16 rounded self-center"
        >
          รีเซ็ต
        </button>
        <button
          @click="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 w-10/12 h-16 rounded self-center"
        >
          ยืนยัน
        </button>
      </div>
    </div>
    <p class="text-sm text-red-900 bg-red-200">
      {{ activeNumberError }}
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bonPrice: null,
      langPrice: null,
      activeNumber: null,
      activeNumbers: [],
      activeNumberError: ''
    }
  },
  watch: {
    activeNumber: function (val, oldVal) {
      const inputLenght = String(val).length
      if (inputLenght === 1) {
        const isDuplicated = this.checkDuplicatedActiveNumber(
          this.activeNumbers,
          val
        )
        if (isDuplicated) {
          this.activeNumberError = 'เลขซ้ำนะจ๊ะ'
        } else {
          this.activeNumberError = ''
          const runNumbers = this.runNumbers(val)
          this.activeNumbers = runNumbers
        }
        this.activeNumber = null
      }
    }
  },
  methods: {
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
    checkDuplicatedActiveNumber(list, val) {
      const duplicated = list.filter((obj) => {
        console.log('data: ', obj.data)
        return obj.data === val
      })
      console.log('checkDup', duplicated, ' length:', duplicated.length)
      return duplicated.length > 0
    },
    runNumbers(data) {
      var result = []
      for (let index = 0; index < 10; index++) {
        const combine = `${index}${data}`
        if (!this.checkDuplicatedActiveNumber(result, combine)) {
          result.push({ data: combine })
        }
        const swap = `${data}${index}`
        if (!this.checkDuplicatedActiveNumber(result, swap)) {
          result.push({ data: swap })
        }
      }
      return result
    },
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
      const emitDatas = {
        title: '2 ตัว',
        subtitle: 'บน x ล่าง',
        detail: `${this.bonPrice} x ${this.langPrice}`,
        numbers: this.activeNumbers,
        lottos: lottos
      }

      this.$emit('numbers-submitted', emitDatas)
      this.reset()
    },
    removeNumber(index) {
      this.activeNumbers.splice(index, 1)
    },
    removeLastNumber(event) {
      if (event.target.value.length === 0) {
        this.removeNumber(this.activeNumbers.length - 1)
      }
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