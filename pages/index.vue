<template>
  <div class="w-full h-full p-16 overflow-auto">
    <section class="flex flex-row flex-wrap items-center">
      <button
        v-for="item in items"
        :key="item.id"
        class="transition duration-600 ease-in transform hover:scale-125 rounded-md bg-white border border-gray-100 py-8 px-8 m-4 shadow"
      >
        <p
          class="text-2xl text-left tracking-wide overflow-ellipsis overflow-hidden text-gray-700"
        >
          หุ้นไต้หวัน
        </p>
        <p
          class="text-2xl text-left tracking-wide overflow-ellipsis overflow-hidden text-gray-500"
        >
          รอบ(3) 05:00
        </p>
        <div class="rounded-full bg-pink-100 mt-4 pl-4 pr-2 py-1">
          <span class="text-sm text-pink-900">เหลือเวลา 56 นาที</span>
        </div>
      </button>
    </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },
  data() {
    return {
      items: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
  // middleware: 'auth',
}
</script>
