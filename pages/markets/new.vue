<template>
  <main
    class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
  >
    <section>
      <h3 class="font-bold text-2xl">สร้างตลาด</h3>
      <p class="text-gray-600 pt-2">กรุณากรอกข้อมูล</p>
    </section>

    <section class="mt-10">
      <form class="flex flex-col" autocomplete="off" @submit="create">
        <div v-if="errors.length" class="errors">
          <p class="bg-red-400 p-4">
            <b class="text-white">กรุณาระบุข้อมูลให้ถูกต้อง</b>
            <ul>
              <li v-for="error in errors" :key="error" class="text-red-900 m-1">- {{ error }}</li>
            </ul>
          </p>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="avatar">
              รูปปกตลาด
          </label>
          <input 
            id="avatar" 
            type="file" 
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            @change="onFileUpload" />
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="name"
            >ชื่อ</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="openTime"
            >เวลาเปิด</label
          >
          <input
            type="text"
            id="openTime"
            v-model="openTime"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="closeTime"
            >เวลาปิด</label
          >
          <input
            type="text"
            id="closeTime"
            v-model="closeTime"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="color"
            >สีปก</label
          >
          <input
            type="text"
            id="color"
            v-model="color"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="fontColor"
            >สีตัวอักษร</label
          >
          <input
            type="text"
            id="fontColor"
            v-model="fontColor"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>

        <button
            type="submit"
            class="inline-flex justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150"
        >
            <template v-if="isLoading">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing
            </template>
            <template v-else>ยืนยัน</template>
        </button>
      </form>
    </section>
  </main>
</template>
<script>
import moment from 'moment'
export default {
  middleware: 'auth',
  data() {
    return {
      name: '',
      color: '',
      fontColor: '',
      openTime: '',
      closeTime: '',
      errors: [],
      isLoading: false,
      FILE: null
    }
  },
  methods: {
    async create(e) {
      e.preventDefault()
      this.isLoading = true
      const validation = this.validate()
      this.errors = validation.err
      const payload = validation.payload
      if (this.errors.length > 0) {
        this.scrollToError()
        this.isLoading = false
        return
      }
      const url = `${this.$axios.defaults.baseURL}/markets`
      try {
        await this.$axios.$post(url, payload).then((resp) => {
          this.isLoading = false
          this.$router.replace('/markets')
        })
      } catch (e) {
        this.isLoading = false
        this.errors.push(e.message)
      }
    },
    onFileUpload(event) {
      this.FILE = event.target.files[0]
    },
    validate() {
      var err = []
      const name = this.name.trim()
      const nameLength = name.length
      const maxNameLength = 255
      const minNameLength = 1
      if (nameLength < minNameLength || nameLength > maxNameLength) {
        err.push(`ข้อมูลชื่อตลาด ${minNameLength}-${maxNameLength} ตัวอักษร`)
      }
      const color = this.color.trim()
      const colorLength = color.length
      if (colorLength < minNameLength || colorLength > maxNameLength) {
        err.push(`ข้อมูลสีตลาด ${minNameLength}-${maxNameLength} ตัวอักษร`)
      }

      const timeFormat = 'HH:mm'
      const rawOpenTime = moment(this.openTime, timeFormat)
      const openTime = rawOpenTime.format(timeFormat)
      const rawCloseTime = moment(this.closeTime, timeFormat)
      const closeTime = rawCloseTime.format(timeFormat)
      if (typeof rawOpenTime === 'undefined' || !rawOpenTime.isValid()) {
        err.push('ระบุเวลาเปิดตลาดให้อยู่ในรูปแบบ HH:mm')
      } else if (this.openTime !== openTime) {
        this.openTime = openTime
      }

      if (typeof rawCloseTime === 'undefined' || !rawCloseTime.isValid()) {
        err.push('ระบุเวลาปิดตลาดให้อยู่ในรูปแบบ HH:mm')
      } else if (this.closeTime !== closeTime) {
        this.closeTime = closeTime
      }

      if (rawCloseTime.isBefore(rawOpenTime)) {
        err.push('เวลาเปิดตลาด ตั้งเริ่มต้นก่อน เวลาปิดตลาด')
      }

      if (this.FILE === null) {
        err.push('กรุณาเลือกรูปหน้าปกตลาด')
      }

      // upload file
      const payload = new FormData()
      payload.append('upload', this.FILE, this.FILE.name)
      payload.append('name', name)
      payload.append('color', color)
      payload.append('fontColor', fontColor)
      payload.append('openTime', openTime)
      payload.append('closeTime', closeTime)
      return { err, payload }
    },
    scrollToError() {
      const el = this.$el.getElementsByClassName('errors')[0]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>