
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
              @keydown.enter="onEnter"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-col">
          <div class="flex-1">
            <label class="block" for="priceTong">
              <span class="text-gray-700 text-sm inline-block w-full">ตรง</span>
              <input
                name="priceTong"
                id="priceTong"
                type="number"
                v-model="priceTong"
                class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                placeholder="ราคาตรง"
              />
            </label>
          </div>
          <div class="flex-1">
            <label class="block" for="priceTod">
              <span class="text-gray-700 text-sm inline-block w-full"
                >ราคาโต๊ด</span
              >
              <input
                name="priceTod"
                id="priceTod"
                v-model="priceTod"
                type="number"
                class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                placeholder="ราคาโต๊ด"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <span
          @click="reverse"
          class="cursor-pointer bg-purple-500 hover:bg-purple-200 hover:text-purple-600 text-white p-2 m-2 w-10/12 rounded self-center text-center"
        >
          กลับเลข
        </span>
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
      activeNumber: null,
      activeNumbers: [],
      activeNumberError: '',
      priceTong: null,
      priceTod: null,
    }
  },
  watch: {
    activeNumber: function (val, oldVal) {
      if (typeof val === 'undifined' || val === null) {
        return
      }
      const splitter = " "
      const p = new RegExp("(" + splitter + ")")
      const splittedVals = val.split(p)
      splittedVals.forEach(element => {
        const input = String(element)
        const inputLength = input.length
        if (inputLength > 3) {
          this.autoAssignPrice(input)
        } else if (inputLength === 3) {
          this.activateNumber(input)
        } else {
          return
        }
      })
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
      const equalSign = "="
      const splittedEqualSingVals = this.split(equalSign, val)
      if (splittedEqualSingVals.length > 1) {
        this.activeLastestPasteNumber(splittedEqualSingVals[0])
        this.activePastePricing(splittedEqualSingVals)
        return
      }

      const spaceSign = " "
      const splittedVals = this.split(spaceSign, val)
      console.log('spaceSign: splittedVals:', splittedVals);
      if (splittedVals.length > 0) {
        this.activatePrice(splittedVals[0])
        return
      }
    },
    split(splitter, val) {
      const p = new RegExp("(" + splitter + ")")
      return val.split(p)
    },
    activeLastestPasteNumber(val) {
      const latestNumber = parseInt(val)
      const strNumber = String(latestNumber)
      if (latestNumber > 99) {
        this.activateNumber(strNumber)
      }
    },
    activePastePricing(vals) {
      var pricingStatement = ''
      var foundEqual = false
      vals.forEach(element => {
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
      const splitted = this.split("x", lowerCase)
      if (splitted.length > 2) {
        this.priceTong = splitted[0]
        this.priceTod = splitted[2]
        return
      }
      
      const indexOfStar = lowerCase.indexOf('*')
      if (indexOfStar > -1) {
        this.priceTong = lowerCase.slice(0, indexOfStar)
        this.priceTod = lowerCase.slice(indexOfStar+1, lowerCase.length)
      }
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
    },
    submit() {
      const lottos = this.activeNumbers.map((number) => {
        return [
          {
            type: 'char3bon',
            number: number.data,
            price: this.priceTong
          },
          {
            type: 'char3toad',
            number: number.data,
            price: this.priceTod
          }
        ]
      })
      const emitDatas = {
        title: '3 ตัว',
        subtitle: 'บน x โต๊ด',
        detail: `${this.priceTong} x ${this.priceTod}`,
        numbers: this.activeNumbers,
        lottos: lottos
      }
      this.$emit('numbers-submitted', emitDatas)
      this.reset()
    },
    reset() {
      this.priceTong = null
      this.priceTod = null
      this.activeNumber = null
      this.activeNumbers = []
      this.activeNumberError = ''
    },
    onEnter(e) {
      this.submit()
    },
    validate() {
      const min = 50
      const max = 100000
      const tong = parseInt(this.priceTong)
      const toad = parseInt(this.priceTod)
      if (tong < min || tong > max || toad < min || toad > max) {
        this.activeNumberError = `ระบุยอดระหว่าง ${min}-${max}`
        return false
      }
      if (this.activeNumbers.length === 0) {
        this.activeNumberError = `ระบุยอดระหว่างหมายเลข`
        return false
      }
      return true
    },
    reverse() {
      var reversed = Array()
      this.activeNumbers.forEach((element) => {
        const sixNumbers = this.swap6Numbers(element.data)
        reversed = reversed.concat(sixNumbers)
      })
      this.activeNumbers = this.activeNumbers.concat(reversed)
    },
    swap(number1, number2) {
      return `${number2}${number1}`
    },
    swap6Numbers(source) {
      var results = []
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
      return results
        .filter((r) => !this.checkDuplicatedActiveNumber(r))
        .map((f) => {
          return { data: f }
        })
    },
    checkDuplicatedInList(list, val) {
      const duplicated = list.filter((obj) => {
        return obj === val
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