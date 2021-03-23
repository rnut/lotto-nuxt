<template>
  <div>
    <NavBar />
    <div class="h-screen py-16">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar
  }
}
</script>
