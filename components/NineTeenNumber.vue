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
              <p
                :class="{
                  'line-through': item.isDelete === true,
                  'text-gray-400': item.isDelete
                }"
              >
                {{ item.data }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-2">
        <div class="flex flex-col gap-2">
          <button
            @click="reset"
            class="
              text-red-500
              hover:text-white
              hover:bg-red-700
              text-white
              p-4
              w-full
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
              p-4
              w-full
              rounded
              self-center
            "
          >
            ยืนยัน
          </button>
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
        <span class="text-gray-700 text-sm inline-block w-full">บน</span>
        <input
          ref="priceBon"
          @keydown.enter="changeFocus('priceLang')"
          name="priceBon"
          v-model="bonPrice"
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
          placeholder="ราคาบน"
        />
      </label>
      <label class="block w-full" for="priceLang">
        <span class="text-gray-700 text-sm inline-block w-full">ล่าง</span>
        <input
          ref="priceLang"
          name="priceLang"
          v-model="langPrice"
          id="priceLang"
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
          placeholder="ราคาล่าง"
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
    changeFocus(to) {
      var textField = null
      switch (to) {
        case 'priceBon':
          textField = this.$refs.priceBon
          break
        case 'priceLang':
          textField = this.$refs.priceLang
          break
        case 'activeNumber':
          textField = this.$refs.activeNumber
          break
      }
      console.log('changeFocue: ', to)
      if (typeof textField === 'undefined') {
        return
      }
      textField.focus()
    },
    onEnter(e) {
      this.submit()
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
    checkDuplicatedActiveNumber(list, val) {
      const duplicated = list.filter((obj) => {
        return obj.data === val
      })
      return duplicated.length > 0
    },
    runNumbers(data) {
      var result = []
      for (let index = 0; index < 10; index++) {
        const combine = `${index}${data}`
        if (!this.checkDuplicatedActiveNumber(result, combine)) {
          result.push({ data: combine, isDelete: false })
        }
        const swap = `${data}${index}`
        if (!this.checkDuplicatedActiveNumber(result, swap)) {
          result.push({ data: swap, isDelete: false })
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
    validate() {
      const min = 1
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
      const filteredNumbers = this.activeNumbers.filter((number) => {
        return number.isDelete === false
      })
      const lottos = filteredNumbers.map((number) => {
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
        numbers: filteredNumbers,
        lottos: lottos
      }

      this.$emit('numbers-submitted', emitDatas)
      this.reset()
    },
    removeNumber(index) {
      const isDelete = this.activeNumbers[index].isDelete
      this.activeNumbers[index].isDelete = !isDelete
    },
    removeLastNumber(event) {
      if (event.target.value.length === 0) {
        this.removeNumber(this.activeNumbers.length - 1)
      }
    }
  }
}
</script>