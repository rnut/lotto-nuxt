<template>
  <main class="bg-white max-w-lg mx-auto p-8 my-10 rounded-lg shadow-2xl">
    <section>
      <h3 class="font-bold text-2xl">ตั้งค่าตลาด</h3>
      <p class="text-gray-600 pt-2">
        กรุณากรอกข้อมูลให้ครบถ้วน แล้วกดบันทึก เพื่อปรับตั้งค่า
      </p>
    </section>

    <section class="mt-10">
      <form class="flex flex-col" autocomplete="off" @submit="onSave">
        <div v-if="errors.length" class="errors">
          <p class="bg-red-400 p-4">
            <b class="text-white">กรุณาระบุข้อมูลให้ถูกต้อง</b>
            <ul>
              <li v-for="error in errors" :key="error" class="text-red-900 m-1">- {{ error }}</li>
            </ul>
          </p>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <img
            :src="getMarketAvatar()"
            alt="market_avatar"
            class="h-auto w-32 mx-auto shadow-md"/>
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
            v-model="market.name"
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
            v-model="market.openTime"
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
            v-model="market.closeTime"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div class="mb-6 pl-2 p-4 rounded bg-gray-200">
          <label for="periodTypeCalendar" class="pl-4">
            <input id="periodTypeCalendar" type="radio" v-model="market.periodType" value="calendar" class="p-2"/>
            <span>ตามปฏิทิน</span>
          </label>
          <label for="periodTypeDay" class="pl-4">
            <input id="periodTypeDay" type="radio" v-model="market.periodType" value="days"/>
            <span>ตามวัน</span>
          </label>
        </div>
        <div v-if="market.periodType === 'calendar'" class="mb-6 pt-3 rounded bg-gray-200">
            <label for="date"  class="block text-gray-700 text-sm font-bold mb-2 ml-3">
              <span class="text-gray-400 block">เวลา</span>
                <vc-calendar :attributes="attributes" @dayclick="onDayClick" :min-date='new Date()'/>
              <!-- <client-only placeholder="loading...">
              </client-only> -->
          </label>
        </div>
        
        <div v-else class="mb-6 pl-2 p-4 rounded bg-gray-200 flex flex-col">
          <h3 class="text mb-2 text-gray-400">ระบุวันเปิด..</h3>
          <label for="checkboxSunday">
            <input type="checkbox" id="checkboxSunday" v-model="market.onAirDays" value='Sunday'/>
            <span class="text-gray-500">วันอาทิตย์</span>
          </label>
          <label for="checkboxMonday">
            <input type="checkbox" id="checkboxMonday" v-model="market.onAirDays" value='Monday' />
            <span class="text-gray-500">วันจันทร์</span>
          </label>
          <label for="checkboxTuesday">
            <input type="checkbox" id="checkboxTuesday" v-model="market.onAirDays" value='Tuesday' />
            <span class="text-gray-500">วันอังคาร</span>
          </label>
          <label for="checkboxWednesday">
            <input type="checkbox" id="checkboxWednesday" v-model="market.onAirDays" value='Wednesday' />
            <span class="text-gray-500">วันพุธ</span>
          </label>
          <label for="checkboxThursday">
            <input type="checkbox" id="checkboxThursday" v-model="market.onAirDays" value='Thursday' />
            <span class="text-gray-500">วันพฤหัส</span>
          </label>
          <label for="checkboxFriday">
            <input type="checkbox" id="checkboxFriday" v-model="market.onAirDays" value='Friday'/>
            <span class="text-gray-500">วันศุกร์</span>
          </label>
          <label for="checkboxSaturday">
            <input type="checkbox" id="checkboxSaturday" v-model="market.onAirDays" value='Saturday'/>
            <span class="text-gray-500">วันเสาร์</span>
          </label>
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
            v-model="market.color"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="fontColor">
              สีตัวอักษร
          </label>
          <input
            type="text"
            id="fontColor"
            v-model="market.fontColor"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center mb-6 px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150"
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
        <button
          type="cancel"
          class="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        >
          ยกเลิก
        </button>
        <div class="flex justify-end">
          <span
            @click="onDelete"
            class="cursor-pointer text-sm text-red-600 hover:text-red-700 hover:underline mb-6"
            >ลบตลาด
          </span>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import moment from 'moment'
import VCalendar from 'v-calendar'
export default {
  components: {
    VCalendar
  },
  data() {
    return {
      isLoading: false,
      errors: [],
      FILE: null,
      periodType: '',
      periodDays: []
    }
  },
  computed: {
    dates() {
      return this.days.map((day) => day.date)
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date
      }))
    }
  },
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/markets/${slug}`
    const market = await $axios.$get(url)
    const days = market.onAirTimes.map((d) => {
      let date = moment(d.open)
      return {
        id: date.format('YYYY-MM-DD'),
        date: d.open
      }
    })
    return { slug, market, days }
  },
  methods: {
    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id)
      if (idx >= 0) {
        this.days.splice(idx, 1)
      } else {
        this.days.push({
          id: day.id,
          date: day.date
        })
      }
    },
    onFileUpload(event) {
      this.FILE = event.target.files[0]
    },
    getMarketAvatar() {
      if (typeof this.market.avatar === 'undefined') {
        return `/logos/logo.svg`
      } else {
        return `${this.market.avatar}`
      }
    },
    async onSave(e) {
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
      const m = this.market
      const slug = m._id
      const url = `${this.$axios.defaults.baseURL}/markets/${slug}`
      try {
        await this.$axios.patch(url, payload)
        this.$router.push({ path: '/markets' })
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        alert('เกิดข้อผิดพลาด(20001)')
      }
    },
    async onDelete() {
      const m = this.market
      if (confirm(`ยืนยันการลบข้อมูลผู้ใช้งาน ${m.name}`)) {
        await this.delete(m._id)
      }
    },
    async delete(id) {
      const url = `${this.$axios.defaults.baseURL}/markets/${id}`
      try {
        await this.$axios.delete(url)
        this.$router.replace({ name: 'markets' })
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    },
    validate() {
      var err = []
      const name = this.market.name.trim()
      const nameLength = name.length
      const maxNameLength = 255
      const minNameLength = 1
      if (nameLength < minNameLength || nameLength > maxNameLength) {
        err.push(`ข้อมูลชื่อตลาด ${minNameLength}-${maxNameLength} ตัวอักษร`)
      }
      const color = this.market.color.trim()
      const colorLength = color.length
      if (colorLength < minNameLength || colorLength > maxNameLength) {
        err.push(`ข้อมูลสีตลาด ${minNameLength}-${maxNameLength} ตัวอักษร`)
      }

      const fontColor = this.market.fontColor.trim()
      const fontColorLength = fontColor.length
      if (fontColorLength < minNameLength || fontColorLength > maxNameLength) {
        err.push(
          `ข้อมูลสีตัวอักษรตลาด ${minNameLength}-${maxNameLength} ตัวอักษร`
        )
      }

      const timeFormat = 'HH:mm'
      const rawOpenTime = moment(this.market.openTime, timeFormat)
      const openTime = rawOpenTime.format(timeFormat)
      const rawCloseTime = moment(this.market.closeTime, timeFormat)
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

      // upload file
      const payload = new FormData()
      if (this.FILE !== null) {
        payload.append('upload', this.FILE, this.FILE.name)
      }
      if (this.market.periodType === 'calendar') {
        payload.append('days', JSON.stringify(this.days))
      } else {
        payload.append('onAirDays', JSON.stringify(this.market.onAirDays))
      }
      payload.append('isActive', this.market.isActive)
      payload.append('periodType', this.market.periodType)
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
  },
  filters: {
    dateCell(value) {
      let dt = new Date(value)

      return dt.getDate()
    },
    date(val) {
      return val ? moment(val).locale('th').format('ll') : ''
    },
    currencies(value) {
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return formatter.format(value)
    }
  }
}
</script>