<template>
  <div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <header class="max-w-lg mx-auto">
      <a href="#">
        <h1 class="text-4xl font-bold text-white text-center">Startup</h1>
      </a>
    </header>

    <main
      class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
    >
      <section class="flex justify-between p-4 bg-red-600" v-if="errorMessage">
        <span class="text-white">{{ errorMessage }}</span>
        <span @click="clearErrorMessage" class="text-white text-end">x</span>
      </section>
      <section>
        <h3 class="font-bold text-2xl">Welcome to Startup</h3>
        <p class="text-gray-600 pt-2">Sign in to your account.</p>
      </section>

      <section class="mt-10">
        <form class="flex flex-col" @submit="login">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="email"
              >Email</label
            >
            <input
              type="text"
              id="email"
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
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              px-4
              py-2
              border border-transparent
              text-base
              leading-6
              font-medium
              rounded-md
              text-white
              bg-purple-600
              hover:bg-purple-700
              focus:border-rose-700
              active:bg-rose-700
              transition
              ease-in-out
              duration-150
            "
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
            <template v-else>Sign In</template>
          </button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import {} from '@nuxtjs/axios'
export default {
  layout: 'auth',
  head() {
    return {
      title: 'start up'
    }
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false
    }
  },
  methods: {
    async login(e) {
      this.isLoading = true
      this.clearErrorMessage()
      e.preventDefault()
      const payload = {
        username: this.username,
        password: this.password
      }
      try {
        const resp = await this.$auth.loginWith('local', { data: payload })
        this.$auth.setToken('local', 'Bearer ' + resp.data.token)
        const role = resp.data.user.role
        var route = ''
        switch (role) {
          case 'member':
            route = '/boards'
            break
          case 'agent':
            route = '/dashboard/agent'
            break
          case 'admin':
            route = '/dashboard/admin'
            break
          case 'announcer':
            route = '/announces'
        }
        this.isLoading = false
        this.$router.push(route)
      } catch (e) {
        this.isLoading = false
        if (typeof e.response !== 'undefined' && e.response.status == 400) {
          this.errorMessage = e.response.data.message
        }
        // this.$router.push('/login')
      }
    },
    clearErrorMessage() {
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
.body-bg {
  background-color: #9921e8;
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
</style>
