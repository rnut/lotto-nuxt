<template>
  <div class="w-full h-full p-16 overflow-auto">
    <button class="bg-red-300"></button>
    <NuxtLink :to="`blogs/ioiweuprio`">
      <li>test</li>
    </NuxtLink>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },
  data() {
    return {}
  },
  methods: {},
  middleware: 'auth'
}
</script>
