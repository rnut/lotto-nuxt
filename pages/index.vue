<template>
  <div class="w-full h-full p-16">
    <h1>Market</h1>
    <section class="mx-4 flex flex-row flex-wrap">
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded-md border-2 border-gray-100 p-24 m-2 bg-gray-100"
      >
        <h1>หุ้นไต้หวัน</h1>
        <h2>รอบ(3) 05:00</h2>
        <div>เหลือเวลา 56 นาที</div>
      </div>

      <div class="rounded border-2 border-indigo-600">
        <h1>หุ้นไต้หวัน</h1>
        <h2>รอบ(3) 05:00</h2>
        <div>เหลือเวลา 56 นาที</div>
      </div>
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

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
