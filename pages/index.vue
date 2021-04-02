<template>
  <div class="w-full h-full p-16 overflow-auto">
    <button class="bg-red-300">
      <!-- <NuxtLink to="/member/board">
        About (internal link that belongs to the Nuxt App)
      </NuxtLink> -->
    </button>
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
      // await this.$auth.logout()
      // this.$router.push('/login')
    }
  }
  // middleware: 'auth',
}
</script>
