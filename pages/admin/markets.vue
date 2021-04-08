<template>
  <div class="p-16">
    <h1 class="text-2xl">สร้างตลาด</h1>
    <section class="mt-10">
      <form class="flex flex-col" @submit="login">
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
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
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
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
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
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
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="color"
            >รหัสสี</label
          >
          <input
            type="text"
            id="color"
            v-model="color"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div class="flex justify-end"></div>
        <button
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >
          สร้าง
        </button>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    }
  }
}
</script>

<style>
</style>