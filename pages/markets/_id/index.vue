<template>
  <section>
    <pre>{{ market }}</pre>
    <button @click="onDelete(market)">ลบข้อมูล</button>
  </section>
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
    async onDelete(m) {
      if (confirm(`ยืนยันการลบข้อมูลผู้ใช้งาน ${m.name}`)) {
        await this.delete(m._id)
      }
    },
    async delete(id) {
      const url = `${this.$axios.defaults.baseURL}/markets/${id}`
      try {
        const resp = await this.$axios.delete(url)
        this.$router.replace({ name: 'markets' })
      } catch (e) {
        alert('ลบไม่สำเร็จ')
      }
    }
  }
}
</script>