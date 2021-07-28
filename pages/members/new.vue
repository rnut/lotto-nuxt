<template>
  <main
    class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
  >
    <section>
      <h3 class="font-bold text-2xl">สร้างผู้ใช้งาน</h3>
      <p class="text-gray-600 pt-2">กรุณากรอกข้อมูล</p>
    </section>

    <section class="mt-10">
      <form class="flex flex-col" autocomplete="off" @submit="create">
        <div v-if="errors.length" class="bg-red-400 p-4 errors">
          <b class="text-white">กรุณาระบุข้อมูลให้ถูกต้อง</b>
          <ul>
            <li v-for="error in errors" :key="error" class="text-red-900 m-1">
              - {{ error }}
            </li>
          </ul>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="username"
            >UserName</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          />
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="password"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          />
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
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="lineID"
            >Line</label
          >
          <input
            type="text"
            id="lineID"
            v-model="lineID"
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="mobileNumber"
            >เบอร์โทรศัพท์</label
          >
          <input
            type="text"
            id="mobileNumber"
            v-model="mobileNumber"
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          />
        </div>

        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="role"
            >สิทธิ์การใช้งาน</label
          >
          <select
            id="role"
            v-model="role"
            class="
              bg-gray-200
              rounded
              w-full
              text-gray-700
              focus:outline-none
              border-b-4 border-gray-300
              focus:border-purple-600
              transition
              duration-500
              px-3
              pb-3
            "
          >
            <option
              v-for="role in roles"
              :key="role.value"
              v-bind:value="role.value"
            >
              {{ role.title }}
            </option>
          </select>
        </div>

        <button
          class="
            bg-purple-600
            hover:bg-purple-700
            text-white
            font-bold
            py-2
            rounded
            shadow-lg
            hover:shadow-xl
            transition
            duration-200
          "
          type="submit"
        >
          ยืนยัน
        </button>
      </form>
    </section>
  </main>
</template>
<script>
export default {
  middleware: 'auth',
  computed: {
    roles: function () {
      const role = this.$auth.user.role
      switch (role) {
        case 'member':
          return []
        case 'agent':
          return [{ value: 'member', title: 'ผู้เล่น' }]
        case 'admin':
          return [
            { value: 'member', title: 'ผู้เล่น' },
            { value: 'agent', title: 'เอเย่น' },
            { value: 'announcer', title: 'ผู้ประกาศรางวัล' }
          ]
      }
    }
  },
  data() {
    return {
      username: '',
      password: '',
      name: '',
      lineID: '',
      mobileNumber: '',
      role: 'member',
      errors: []
    }
  },
  methods: {
    async create(e) {
      e.preventDefault()
      const validated = this.validate()
      this.errors = validated.errors
      const payload = validated.payload
      if (this.errors.length > 0) {
        this.scrollToError()
        return
      }
      try {
        const url = `${this.$axios.defaults.baseURL}/users/create/member`
        const resp = await this.$axios.$post(url, payload)
        alert('สร้างผู้ใช้งานเรียบร้อย')
        this.$router.replace('/members')
      } catch (e) {
        alert(`เกิดข้อผิดพลาด 90000 ${e.message}`)
      }
    },
    validate() {
      const username = this.username.trim()
      const password = this.password.trim()
      const name = this.name.trim()
      const lineID = this.lineID.trim()
      const mobileNumber = this.mobileNumber.trim()
      const role = this.role.trim()
      const errorUserName = this.validateEmptyString(username, 'ชื่อผู้ใช้')
      const errorPassword = this.validatePassword(password)
      const errorName = this.validateEmptyString(name, 'ชื่อ')
      const errorLineID = this.validateEmptyString(lineID, 'ไลน์ไอดี')
      const errorMobileNumber = this.validateEmptyString(
        mobileNumber,
        'เบอร์โทรศัพท์'
      )
      const errors = [
        errorUserName,
        errorPassword,
        errorName,
        errorLineID,
        errorMobileNumber
      ].filter((e) => e !== '')
      const payload = {
        username,
        password,
        name,
        lineID,
        mobileNumber,
        role
      }
      return { payload, errors }
    },
    validateEmptyString(data, tag) {
      const maxLength = 255
      const minLength = 1
      if (data.length < minLength || data.length > maxLength) {
        return `กรุณาระบุ${tag} ระหว่าง ${minLength}-${maxLength} อักขระ`
      } else {
        return ''
      }
    },
    validatePassword(data) {
      const maxLength = 40
      const minLength = 8
      if (data.length < minLength || data.length > maxLength) {
        return `กรุณาระบุรหัสผ่าน ${minLength}-${maxLength} อักขระ`
      } else {
        return ''
      }
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