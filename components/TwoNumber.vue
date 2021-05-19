<template>
  <div class="">
    <div class="flex gap-4">
      <div class="flex-1">
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
              class="tag-input__text w-full"
              @keypress="isNumber($event)"
              @keydown.delete="removeLastNumber"
              @keydown.enter="onEnter"
            />
          </div>
        </div>
      </div>
      <div class="flex-2">
        <div class="flex flex-col">
          <div class="flex-1">
            <label class="block" for="priceBon">
              <span class="text-gray-700 text-sm inline-block w-full">บน</span>
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
                @keydown.enter="onEnter"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="flex-2">
        <div class="flex flex-col justify-end mt-2">
          <button
            @click="reset"
            class="text-white hover:bg-red-700 bg-red-500 py-2 px-4 m-2 w-10/12 rounded self-center"
          >
            รีเซ็ต
          </button>
          <button
            @click="reverse"
            class="flex flex-col items-center cursor-pointer bg-purple-500 hover:bg-purple-200 hover:text-purple-600 text-white p-2 m-2 rounded self-center text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#ffffff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M14 5h8v2h-8V5zm0 5.5h8v2h-8v-2zm0 5.5h8v2h-8v-2zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"
              />
            </svg>
            <span class="text-sm">กลับเลข</span>
          </button>
          <button
            @click="submit"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 w-10/12 rounded self-center"
          >
            ยืนยัน
          </button>
        </div>
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
      if (typeof val === 'undifined' || val === null) {
        return
      }
      const splitter = ' '
      const p = new RegExp('(' + splitter + ')')
      const splittedVals = val.split(p)
      splittedVals.forEach((element) => {
        const input = String(element)
        const inputLength = input.length
        if (inputLength > 2) {
          this.autoAssignPrice(input)
        } else if (inputLength === 2) {
          this.activateNumber(input)
        } else {
          return
        }
      })

      const inputLenght = String(val).length
      if (inputLenght === 2) {
        const isDuplicated = this.checkDuplicatedActiveNumber(val)
        if (isDuplicated) {
          this.activeNumberError = 'กรุณาระบุเลขที่ไม่ซ้ำกันในบิล'
        } else {
          this.activeNumberError = ''
          this.activeNumbers.push({ data: val })
        }
        this.activeNumber = null
      }
    }
  },
  methods: {
    activateNumber(val) {
      const isDuplicated = this.checkDuplicatedActiveNumber(val)
      if (isDuplicated) {
        this.activeNumberError = 'เลขซ้ำนะจ๊ะ'
      } else {
        this.activeNumberError = ''
        this.activeNumbers.push({ data: val })
      }
      this.activeNumber = null
    },
    autoAssignPrice(val) {
      const equalSign = '='
      const splittedEqualSingVals = this.split(equalSign, val)
      if (splittedEqualSingVals.length > 1) {
        this.activeLastestPasteNumber(splittedEqualSingVals[0])
        this.activePastePricing(splittedEqualSingVals)
        return
      }

      const spaceSign = ' '
      const splittedVals = this.split(spaceSign, val)
      if (splittedVals.length > 0) {
        this.activatePrice(splittedVals[0])
        return
      }
    },
    activeLastestPasteNumber(val) {
      const latestNumber = parseInt(val)
      const strNumber = String(latestNumber)
      if (latestNumber > 0 && latestNumber < 100 && strNumber.length === 2) {
        this.activateNumber(strNumber)
      }
    },
    activePastePricing(vals) {
      var pricingStatement = ''
      var foundEqual = false
      vals.forEach((element) => {
        if (foundEqual) {
          pricingStatement = element
          foundEqual = false
          return
        }
        if (element === '=') {
          foundEqual = true
          return
        }
      })
      this.activatePrice(pricingStatement)
    },
    activatePrice(pricingStatement) {
      if (pricingStatement === '') {
        return
      }
      const lowerCase = String(pricingStatement).toLowerCase()
      const splitted = this.split('x', lowerCase)
      if (splitted.length > 2) {
        this.bonPrice = splitted[0]
        this.langPrice = splitted[2]
        return
      }

      const indexOfStar = lowerCase.indexOf('*')
      if (indexOfStar > -1) {
        this.langPrice = lowerCase.slice(0, indexOfStar)
        this.bonPrice = lowerCase.slice(indexOfStar + 1, lowerCase.length)
      }
    },
    split(splitter, val) {
      const p = new RegExp('(' + splitter + ')')
      return val.split(p)
    },
    reset() {
      this.bonPrice = null
      this.langPrice = null
      this.activeNumber = null
      this.activeNumbers = []
      this.activeNumberError = ''
      console.log('reset: ')
    },
    onEnter(e) {
      this.submit()
    },
    validate() {
      const min = 50
      const max = 100000
      if (
        (typeof this.bonPrice === 'undefined' || this.bonPrice === null,
        typeof this.langPrice === 'undefined' || this.langPrice === null)
      ) {
        this.activeNumberError = `ระบุยอดระหว่าง ${min}-${max}`
        return false
      }
      const tong = parseInt(this.bonPrice)
      const toad = parseInt(this.langPrice)
      if (tong < min || tong > max || toad < min || toad > max) {
        this.activeNumberError = `ระบุยอดระหว่าง ${min}-${max}`
        return false
      }
      if (this.activeNumbers.length === 0) {
        this.activeNumberError = `ระบุหมายเลข`
        return false
      }
      return true
    },
    submit() {
      if (!this.validate()) {
        return
      }
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
    reverse() {
      var reversed = []
      this.activeNumbers.forEach((element) => {
        const firstIndex = element.data.charAt(0)
        const secondIndex = element.data.charAt(1)
        if (firstIndex === secondIndex) {
          return
        } else if (this.checkDuplicatedActiveNumber(element)) {
          return
        } else {
          reversed.push({ data: `${secondIndex}${firstIndex}` })
        }
      })
      this.activeNumbers = this.activeNumbers.concat(reversed)
    },
    isNumber(evt) {
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
</style>