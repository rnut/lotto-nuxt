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

        <button
          class="mb-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >
          บันทึก
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
export default {
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/markets/${slug}`
    const market = await $axios.$get(url)
    return { slug, market }
  },
  methods: {
    async onSave(e) {
      const m = this.market
      const slug = m._id
      const url = `${this.$axios.defaults.baseURL}/markets/${slug}`
      const payload = {
        color: m.color,
        name: m.name,
        openTime: m.openTime,
        closeTime: m.closeTime
      }
      e.preventDefault()
      try {
        await this.$axios.patch(url, payload)
        this.$router.push({ path: '/markets' })
      } catch (e) {
        console.log(e.message)
        console.log(e)
        alert('เกิดข้อผิดพลาด(20001)')
      }
    },
    async onDelete() {
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
    }
  }
}
</script>