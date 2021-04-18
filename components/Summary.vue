<template>
  <div class="divide-y-2 divide-purple-200 divide-solid">
    <div
      v-for="lotto in lottos"
      :key="lotto.id"
      class="rounded border-indigo-600 p-2"
    >
      <div>
        <span class="text-2xl">{{ lotto.title }} </span>
        <br />
        <span class="text-2xl"> {{ lotto.subtitle }} </span>
        <br />
        <span class="text-2xl"> {{ lotto.detail }} </span>
      </div>
      <div>
        <span
          class="text-md"
          v-for="number in lotto.numbers"
          :key="number.number"
        >
          {{ number.number }}
        </span>
      </div>
    </div>
    <!-- // submit summary -->
    <div>
      <button class="bg-green-400">บันทึกบิล</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lottos: []
    }
  }
}
</script>