<template>
  <main class="max-w-lg mx-auto my-10">
    <section class="">
      <div class="font-bold text-xl flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="rgba(91, 33, 182, 1)"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          />
        </svg>
        <span class="ml-2 font-bold text-2xl text-purple-800">
          ตั้งค่าผู้ใช้งาน
        </span>
      </div>
    </section>

    <section class="my-10 p-8 md:p-12 bg-white rounded-lg shadow-2xl">
      <section>
        <h1 class="font-bold text-xl text-gray-700">
          ข้อมูลทั่วไปของผู้ใช้งาน
        </h1>
      </section>

      <form class="" autocomplete="off" @submit="submit">
        <section class="mt-10">
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
              disabled="disabled"
              v-model="member.username"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
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
              v-model="member.name"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
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
              v-model="member.lineID"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
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
              v-model="member.mobileNumber"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>

          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="role"
              >สิทธิ์การใช้งาน</label
            >
            <input
              disabled
              type="text"
              id="role"
              v-model="role"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>

          <div
            class="mb-6 p-4 rounded bg-gray-200 flex items-center justify-between"
          >
            <p>เปิดการใช้่งาน</p>
            <label class="switch">
              <input
                type="checkbox"
                v-model="member.isActive"
                :checked="member.isActive"
              />
              <div class="slider round">
                <span class="on">ปกติ</span>
                <span class="off">แบน</span>
              </div>
            </label>
          </div>

          <div
            class="mb-6 p-4 rounded bg-gray-200 flex items-center justify-between"
          >
            <p>แจ้งชำระเงิน</p>
            <label class="switch">
              <input
                type="checkbox"
                :checked="canConfirmPayment(member)"
                v-on:change="onChangeConfirmPayment(member)"
              />
              <div class="slider round">
                <span class="on">ได้</span>
                <span class="off">ไม่ได้</span>
              </div>
            </label>
          </div>
        </section>

        <hr class="my-8" />

        <section>
          <h3 class="font-bold text-xl">ตั้งค่าข้อมูลรางวัล</h3>
          <p class="text-gray-600 pt-2">ส่วนลด ยอดจ่าย</p>
        </section>

        <section class="mt-10">
          <div
            v-for="lotto in member.lottos"
            :key="lotto._id"
            class="mb-6 pt-3 rounded bg-gray-200 flex gap-4"
          >
            <p class="pl-8 pr-4 py-4">
              {{ lotto.title }}
            </p>
            <div>
              <label
                class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                v-bind:for="`discount-${lotto.type}`"
              >
                ส่วนลด
              </label>
              <input
                type="text"
                v-bind:id="`discount-${lotto.type}`"
                v-model="lotto.discount"
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
            <div>
              <label
                class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                v-bind:for="`reward-${lotto.type}`"
              >
                ยอดจ่าย
              </label>
              <input
                type="text"
                v-bind:id="`reward-${lotto.type}`"
                v-model="lotto.reward"
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
              />
            </div>
          </div>
        </section>

        <section class="flex flex-col">
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold mt-8 py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type="submit"
          >
            บันทึก
          </button>
          <div class="flex justify-between">
            <span
              @click="onClickResetPassword(member)"
              class="cursor-pointer text-sm text-red-600 hover:text-red-700 hover:underline mb-6 mt-2"
            >
              รีเซ็ตรหัสผ่าน
            </span>
            <span
              @click="onDeleteMember(member)"
              class="cursor-pointer text-sm text-red-600 hover:text-red-700 hover:underline mb-6 mt-2"
            >
              ลบผู้ใช้งาน
            </span>
          </div>
        </section>
      </form>
    </section>

    <section>
      <div
        v-bind:class="{
          'opacity-0': !modalActive,
          'modal-active': modalActive,
          'pointer-events-none': !modalActive
        }"
        class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
      >
        <div
          @click="toggleModal()"
          class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        ></div>

        <div
          class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
        >
          <div class="modal-content py-4 text-left px-6">
            <form class="" autocomplete="off" @submit="submitChangePassword">
              <!--Title-->
              <div class="flex justify-between items-center pb-3">
                <p class="text-2xl font-bold">รีเซ็ตรหัสผ่าน!</p>
                <div
                  @click="toggleModal()"
                  class="modal-close cursor-pointer z-50"
                >
                  <svg
                    class="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                    ></path>
                  </svg>
                </div>
              </div>

              <!--Body-->
              <p>กรุณาระบุรหัสผ่านที่ต้องการเปลี่ยน</p>
              <div class="mt-2 mb-6 pt-3 rounded bg-gray-200">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="password"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                />
              </div>
              <!--Footer-->
              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                >
                  ยืนยันเปลี่ยนรหัสผ่าน
                </button>
                <span
                  type="cancel"
                  @click="toggleModal()"
                  class="modal-close px-4 bg-red-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                >
                  ปิด
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      modalActive: false,
      confirmPaymentKey: 'confirmpayment',
      password: '',
      errors: []
    }
  },
  computed: {
    role: function () {
      switch (this.member.role) {
        case 'member':
          return 'ผู้เล่น'
        case 'agent':
          return 'เอเย่น'
        case 'admin':
          return 'แอดมิน'
      }
    }
  },
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/users/${slug}`
    const member = await $axios.$get(url)
    return { slug, member }
  },
  methods: {
    async submit(e) {
      e.preventDefault()
      const validated = this.validate()
      this.errors = validated.errors
      if (this.errors.length > 0) {
        this.scrollToError()
        return
      }
      const url = `${this.$axios.defaults.baseURL}/users/${this.slug}`
      try {
        const resp = await this.$axios.patch(url, this.member)
        alert(`แก้ไขข้อมูลสำเร็จ`)
        this.$router.replace('/members')
      } catch (e) {
        alert(`แก้ไขข้อมูลไม่สำเร็จ ${e.message}`)
      }
    },
    async onDeleteMember(member) {
      if (confirm(`ยืนยันการลบข้อมูลผู้ใช้งาน ${member.name}`)) {
        await this.deleteMember(member._id)
      }
    },
    async deleteMember(id) {
      const url = `${this.$axios.defaults.baseURL}/users/${id}`
      try {
        const resp = await this.$axios.delete(url)
        this.$router.replace({ name: 'members' })
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    },
    async submitChangePassword(e) {
      e.preventDefault()
      const id = this.slug
      const url = `${this.$axios.defaults.baseURL}/users/reset/${id}`
      const password = this.password.trim()
      const errorPassword = this.validatePassword(password)
      try {
        const resp = await this.$axios.patch(url, { password: this.password })
        alert('รีเซ็ตรหัสผ่านผู้ใช้งานสำเร็จ')
        this.password = ''
        this.toggleModal()
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    },
    onClickResetPassword(member) {
      this.toggleModal()
    },
    canConfirmPayment(member) {
      if (typeof member === 'undefined') return false
      if (typeof member.cans === 'undefined') return false
      return member.cans.includes(this.confirmPaymentKey)
    },
    toggleModal() {
      this.modalActive = !this.modalActive
    },
    onChangeConfirmPayment(m) {
      const key = this.confirmPaymentKey
      if (m.cans == null) {
        m.cans = [key]
      } else {
        const index = m.cans.indexOf(key)
        if (index !== -1) {
          m.cans.splice(index, 1)
        } else {
          m.cans.push(key)
        }
      }
    },
    validate() {
      const username = this.member.username.trim()
      const name = this.member.name.trim()
      const lineID = this.member.lineID.trim()
      const mobileNumber = this.member.mobileNumber.trim()
      const role = this.member.role.trim()
      const errorUserName = this.validateEmptyString(username, 'ชื่อผู้ใช้')
      const errorName = this.validateEmptyString(name, 'ชื่อ')
      const errorLineID = this.validateEmptyString(lineID, 'ไลน์ไอดี')
      const errorMobileNumber = this.validateEmptyString(
        mobileNumber,
        'เบอร์โทรศัพท์'
      )
      const errors = [
        errorUserName,
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