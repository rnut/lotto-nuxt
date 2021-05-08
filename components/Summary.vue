<template>
  <div class="my-8">
    <div class="p-4 bg-purple-600 flex justify-between">
      <span class="text-xl text-white">บิลใหม่</span>
      <button
        class="flex rounded text-white bg-green-500 px-4 py-1 hover:bg-green-700"
      >
        <span> บันทึกบิล </span>
      </button>
    </div>
    <table class="table-auto w-full" cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr v-for="lotto in lottos" :key="lotto.id">
          <td>
            <span class="text-xl">{{ lotto.title }} </span>
          </td>
          <td>
            <span class=""> {{ lotto.subtitle }} </span><br />
            <span class="text-lg"> {{ lotto.detail }} </span>
          </td>
          <td>
            <span
              class="p-1 m-1 text-lg rounded bg-purple-100"
              v-for="number in lotto.numbers"
              :key="number.number"
            >
              {{ number.number }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['lottos']
}
</script>