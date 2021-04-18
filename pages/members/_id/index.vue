<template>
  <section>
    <h1>{{ this.slug }}</h1>
    <pre>
    {{ member }}
  </pre
    >

    <button @click="onDeleteMember(member)">ลบข้อมูล</button>
  </section>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const slug = params.id
    const url = `${$axios.defaults.baseURL}/users/${slug}`
    const member = await $axios.$get(url)
    return { slug, member }
  },
  methods: {
    async onDeleteMember(member) {
      if (confirm(`ยืนยันการลบข้อมูลผู้ใช้งาน ${member.name}`)) {
        await this.deleteMember(member._id)
      }
    },
    async deleteMember(id) {
      const url = `${this.$axios.defaults.baseURL}/users/${id}`
      try {
        const resp = await this.$axios.delete(url)
        this.$router.replace({ name: 'members' })
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    }
  }
}
</script>