<template>
  <section v-if="members" class="p-8">
    <div class="flex gap-4 items-center">
      <h1 class="text-2xl py-4 font-bold text-purple-800">
        จัดการสมาชิกในการดูแลของเอเย่นต์ :
        <span class="font-bold text-purple-900">{{ agent.name }}</span>
      </h1>
    </div>
    <div v-if="members && members.length > 0" class="bg-purple-600 rounded">
      <table
        class="table-auto w-full"
        cellpadding="0"
        cellspacing="0"
        border="0"
      >
        <thead class="v-data-table-header">
          <tr>
            <th
              role="columnheader"
              scope="col"
              aria-label="ยูเซอร์เนม: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>ยูเซอร์เนม</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="ชื่อเล่น: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>ชื่อเล่น</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="ระดับ: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>ระดับ</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="ผู้สร้าง: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>ผู้สร้าง</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="แจ้งชำระเงิน: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>แจ้งชำระเงิน</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="สถานะ: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
            >
              <span>เปิดใช้งาน</span
              ><i
                aria-hidden="true"
                class="
                  v-icon
                  notranslate
                  v-data-table-header__icon
                  mdi mdi-arrow-up
                  theme--light
                "
                style="font-size: 18px"
              ></i>
            </th>
            <th
              role="columnheader"
              scope="col"
              aria-label="Actions"
              class="text-start"
            >
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-purple-100 cursor-pointer">
          <tr class="" v-for="member in members" :key="member._id">
            <td class="text-start">{{ member.username }}</td>
            <td class="text-start">{{ member.name }}</td>
            <td class="text-start">{{ member.role }}</td>
            <td class="text-start">
              <template v-if="member.createdBy">
                {{ member.createdBy.name }}
              </template>
              <template v-else> n/a </template>
            </td>
            <td class="text-start">
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="checkCanConfirmPayment(member)"
                  v-on:change="onChangeConfirmPayment(member)"
                />
                <div class="slider round">
                  <span class="on">ได้</span>
                  <span class="off">ไม่ได้</span>
                </div>
              </label>
            </td>
            <td class="text-start">
              <label class="switch">
                <input
                  type="checkbox"
                  :checked="member.isActive"
                  v-on:change="onChangeActive(member)"
                />
                <div class="slider round">
                  <span class="on">ปกติ</span>
                  <span class="off">แบน</span>
                </div>
              </label>
            </td>
            <td class="text-start flex gap-2">
              <nuxt-link :to="`/members/${member._id}`">
                <button
                  class="
                    bg-gray-500
                    flex
                    items-center
                    px-3
                    py
                    rounded
                    hover:bg-green-700
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                    />
                  </svg>
                  <span class="m-2 text-white">ตั้งค่า </span>
                </button>
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-else>
      <div class="flex flex-col">
        <img src="/svg/Empty-bro.svg" alt="empty" class="h-96 w-full" />
        <p class="text-center text-2xl">ไม่พบผู้ใช้งาน</p>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      modalActive: false,
      confirmPaymentKey: 'confirmpayment'
    }
  },
  async asyncData({ $axios, params }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/users/underAgent/${slug}`
    const resp = await $axios.$get(url)
    const members = resp.users
    const agent = resp.agent
    return { members, agent }
  },
  methods: {
    toggleModal() {
      this.modalActive = !this.modalActive
    },
    async onChangeActive(m) {
      m.isActive = !m.isActive
      await this.upateUserData(m)
    },
    async onChangeConfirmPayment(m) {
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
      await this.upateUserData(m)
    },
    async upateUserData(m) {
      const url = `${this.$axios.defaults.baseURL}/users/${m._id}`
      return await this.$axios.$patch(url, m)
    },
    checkCanConfirmPayment(member) {
      if (typeof member === 'undefined') return false
      if (typeof member.cans === 'undefined') return false
      if (member.cans === null) return false
      return member.cans.includes(this.confirmPaymentKey)
    }
  }
}
</script>

<style>
</style>