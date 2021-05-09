
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
      priceTod: null
    }
  },
  watch: {
    activeNumber: function (val, oldVal) {
      const inputLenght = String(val).length
      if (inputLenght === 3) {
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
        console.log('data: ', obj.data)
        return obj.data === val
      })
      console.log('checkDup', duplicated, ' length:', duplicated.length)
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