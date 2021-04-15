<template>
  <div class="w-full h-full p-16 overflow-auto">
    <button class="bg-red-300"></button>
  </div>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },
  data() {},
  methods: {},
  middleware: 'auth'
}
</script>
