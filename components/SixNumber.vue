
<template>
  <div class="">
    <h1 class="text-2xl">6 กลับ</h1>
    <div class="border border-gray-800 pt-8 pb-16 px-8 mx-2 my-8 rounded-lg">
      <div class="grid grid-cols-4 gap-4 my-4">
        <div class="col-span-2">
          <label class="block" for="priceBon">
            <span class="text-gray-700 text-sm">เลข</span>
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
              <label class="block my-1" for="prictTong">
                <span class="text-gray-700 text-sm inline-block w-full"
                  >ราคาตรง</span
                >
                <input
                  name="priceTong"
                  id="prictTong"
                  type="number"
                  class="rounded text-md shadow-md p-4 h-16 w-full block border border-indigo-400"
                  placeholder="ราคาตรง"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="flex flex-col pt-7 items-start">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 w-10/12 h-16 rounded self-center"
          >
            ยืนยัน
          </button>

          <button
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
      activeNumber: Number,
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
        console.log('data: ', obj.data)
        return obj.data === val
      })
      console.log('checkDup', duplicated, ' length:', duplicated.length)
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