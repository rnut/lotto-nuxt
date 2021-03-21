<template>
  <div class="container min-w-lg">
    <h3>Welcome</h3>
    <section>
      <form @submit="login">
        <label for="username">ชื่อผู้ใช้</label>
        <input type="text" name="username" placeholder="กรุณาเข้าสู่ระบบ" v-model="username"/>

        <label for="password">รหัสผ่าน</label>
        <input type="password" name="password" placeholder="***********" v-model="password"/>
        <input type="submit" value="เข้าสู่ระบบ" />
      </form>
    </section>
  </div>
</template>

<script>
import {} from '@nuxtjs/axios'
export default {
    data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      const payload = {
        username: this.username,
        password: this.password
      };
      try {
        await this.$auth.loginWith('local', { data: payload })
        this.$router.push('/')
      } catch (e) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
