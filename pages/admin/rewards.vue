<template>
  <div class="p-16">
    <div class="flex flex justify-between">
      <div class="w-100 bg-green-500">
        <h1 class="text-2xl">ตั้งค่าพื้นฐาน</h1>
      </div>
      <div class="inline-block align-center">
        <button
          class="bg-purple-600 h-8 w-8 hover:bg-purple-700 text-white text-white font-bold py-2 rounded-full hover:shadow-xl transition duration-200"
          type="submit"
          value="สร้าง"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            width="1em"
            height="1em"
            style="
              -ms-transform: rotate(360deg);
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            "
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              class="uim-primary"
              d="M9.84 17.08a.997.997 0 0 1-.707-.293l-3.84-3.84a1 1 0 1 1 1.414-1.414l3.133 3.133l7.453-7.453a1 1 0 0 1 1.414 1.414l-8.16 8.16a.997.997 0 0 1-.707.293z"
              fill="white"
            />
            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
          </svg>
        </button>
      </div>
    </div>
    <section
      v-for="item in items"
      :key="item.name"
      class="mt-10 border boorder-purple-300 p-8 rounded-lg shadow-md"
    >
      <form class="flex flex-col" @submit="login">
        <h1 class="text-bold">3 ตัวบน</h1>
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="reward"
            >อัตราจ่าย</label
          >
          <input
            type="text"
            id="reward"
            v-model="reward"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="sale"
            >ส่วนลด</label
          >
          <input
            type="text"
            id="sale"
            v-model="sale"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        // { name: '3 ตัวบน', price: 200, sale: 10 },
        // { name: '3 ตัวล่าง', price: 200, sale: 10 },
        // { name: '2 ตัวบน', price: 200, sale: 10 },
        // { name: '2 ตัวล่าง', price: 200, sale: 10 }
      ]
    }
  },
  methods: {}
}
</script>

<style>
</style>