<template>
  <div class="p-16">
    <h1 class="text-2xl">Boards</h1>
    <!-- <TwoNumber /> -->
    <!-- <ThreeNumber /> -->
    <!-- <SixNumber /> -->
    <!-- <NineTeenNumber /> -->
    <OneNumber @onSubmited="onSubmit" />
  </div>
</template>
<script>
import ThreeNumber from '~/components/ThreeNumber'
import TwoNumber from '~/components/TwoNumber'
import SixNumber from '~/components/SixNumber'
import NineTeenNumber from '~/components/NineTeenNumber'
import OneNumber from '~/components/OneNumber.vue'
export default {
  components: {
    TwoNumber,
    ThreeNumber,
    SixNumber,
    NineTeenNumber,
    OneNumber
  },
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    }
  }
}
</script>

<style>
</style>