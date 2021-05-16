
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
              <span class="text-gray-700 text-sm inline-block w-full"
                >ราคาตรง</span
              >
              <input
                v-model="bonPrice"
                name="priceBon"
                id="priceBon"
                type="number"
                class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                placeholder="ราคาตรง"
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
      activeNumber: null,
      activeNumbers: [],
      activeNumberError: ''
    }
  },
  watch: {
    activeNumber: function (val, oldVal) {
      const input = String(val)
      const inputLenght = input.length
      if (inputLenght === 3) {
        const isDuplicated = this.checkDuplicatedActiveNumber(val)
        if (isDuplicated) {
          this.activeNumberError = 'เลขซ้ำนะจ๊ะ'
        } else {
          this.activeNumberError = ''
          const sixNumbers = this.swap6Numbers(input)
          this.activeNumbers = sixNumbers
        }
        this.activeNumber = null
      }
    }
  },
  methods: {
    checkDuplicatedActiveNumber(val) {
      const duplicated = this.activeNumbers.filter((obj) => {
        return obj.data === val
      })
      return duplicated.length > 0
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
    checkDuplicatedInList(list, val) {
      const duplicated = list.filter((obj) => {
        return obj === val
      })
      return duplicated.length > 0
    },
    swap(number1, number2) {
      return `${number2}${number1}`
    },
    swap6Numbers(source) {
      var results = Array()
      for (let index = 0; index < 6; index++) {
        const first = source.charAt((0 + index) % 3)
        const second = source.charAt((1 + index) % 3)
        const third = source.charAt((2 + index) % 3)
        const combine = `${first}${second}${third}`
        const isDuplicated = this.checkDuplicatedInList(results, combine)
        if (!isDuplicated) {
          results.push(combine)
        }
        const swaped = this.swap(second, third)
        const combineSwap = `${first}${swaped}`
        const isDuplicatedSwap = this.checkDuplicatedInList(
          results,
          combineSwap
        )
        if (!isDuplicatedSwap) {
          results.push(combineSwap)
        }
      }
      return results.map((result) => {
        return { data: result }
      })
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
            type: 'char3bon',
            number: number.data,
            price: this.bonPrice
          }
        ]
      })
      const emitDatas = {
        title: '3 ตัว',
        subtitle: 'บน',
        detail: `${this.bonPrice}`,
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