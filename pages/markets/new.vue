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

        <button
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
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
  data() {
    return {
      name: '',
      color: '',
      openTime: '',
      closeTime: ''
    }
  },
  methods: {
    async create(e) {
      e.preventDefault()
      const payload = {
        name: this.name,
        color: this.color,
        openTime: this.openTime,
        closeTime: this.closeTime
      }
      const url = `${this.$axios.defaults.baseURL}/markets`
      console.log('url')
      await this.$axios.$post(url, payload).then((resp) => {
        this.$router.push({ path: `/markets/${resp._id}` })
      })
    }
  }
}
</script>