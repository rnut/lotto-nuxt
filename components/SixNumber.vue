
<template>
  <div class="flex flex-col">
    <div class="flex gap-4">
      <div class="flex-1">
        <div
          class="
            rounded
            bg-gray-50
            border border-gray-200
            shadow-md
            mt-2
            p-4
            flex flex-row flex-wrap
            activeNumbers
          "
        >
          <div class="tag-input">
            <div
              v-for="(item, index) in activeNumbers"
              :key="item.data"
              class="
                tag-input__tag
                p-2
                m-2
                bg-red-200
                rounded
                text-2xl
                tag
                cursor-pointer
              "
              @click="removeNumber(index)"
            >
              {{ item.data }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-2">
        <div class="flex flex-col">
          <div class="flex-1">
            <div class="flex">
              <button
                @click="reset"
                class="
                  text-red-500
                  hover:text-white
                  hover:bg-red-700
                  text-white
                  py-2
                  px-4
                  m-2
                  w-10/12
                  h-16
                  rounded
                  self-center
                "
              >
                รีเซ็ต
              </button>
              <button
                @click="submit"
                class="
                  bg-green-500
                  hover:bg-green-700
                  text-white
                  font-bold
                  py-2
                  px-4
                  m-2
                  w-10/12
                  h-16
                  rounded
                  self-center
                "
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <label for="activeNumber" class="w-full">
        <span class="text-gray-700 text-sm inline-block w-full">ตัวเลข</span>
        <input
          ref="activeNumber"
          v-model="activeNumber"
          type="text"
          placeholder="ระบุตัวเลข"
          class="
            rounded
            text-md
            shadow-md
            p-4
            w-full
            block
            border border-indigo-400
          "
          @keypress="isNumber($event)"
          @keydown.delete="removeLastNumber"
          @keydown.enter="changeFocus('priceBon')"
        />
      </label>
      <label class="block w-full" for="priceBon">
        <span class="text-gray-700 text-sm inline-block w-full">ราคาตรง</span>
        <input
          ref="priceBon"
          v-model="bonPrice"
          name="priceBon"
          id="priceBon"
          type="number"
          class="
            rounded
            text-md
            shadow-md
            p-4
            w-full
            block
            border border-indigo-400
          "
          placeholder="ราคาตรง"
          @keydown.enter="onEnter"
        />
      </label>
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
    changeFocus(to) {
      var textField = null
      switch (to) {
        case 'priceBon':
          textField = this.$refs.priceBon
          break
        case 'activeNumber':
          textField = this.$refs.activeNumber
          break
      }
      console.log('changeFocus: ', to)
      if (typeof textField === 'undefined' || textField == null) {
        return
      }
      textField.focus()
    },
    onEnter(e) {
      this.submit()
    },
    checkDuplicatedActiveNumber(val) {
      const duplicated = this.activeNumbers.filter((obj) => {
        return obj.data === val
      })
      return duplicated.length > 0
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
    validate() {
      const min = 50
      const max = 100000
      if (typeof this.bonPrice === 'undefined' || this.bonPrice === null) {
        this.activeNumberError = `ระบุยอดระหว่าง ${min}-${max}`
        return false
      }
      const tong = parseInt(this.bonPrice)
      if (tong < min || tong > max) {
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