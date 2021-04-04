<template>
  <div class="container">
    <!-- <h1>Photos</h1>
    <div class="photos">
      <nuxt-link
        v-for="photo in photos"
        :to="{ path: `/photos/${photo.id}` }"
        :key="photo.id"
      >
        <img :src="photo.download_url" class="photo-item" />
        {{ photo.author }}
      </nuxt-link>
    </div> -->
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'Nuxt Fetch API'
    }
  },
  mounted() {
    const source = '112'
    const swap = this.swap6Numbers(source)
    console.log('results: ', swap)
  },
  async asyncData({ $axios }) {
    // const photos = await $axios.$get('https://picsum.photos/v2/list?limit=12')
    // return { photos }
  },
  methods: {
    checkDuplicatedInList(list, val) {
      const duplicated = list.filter((obj) => {
        return obj === val
      })
      return duplicated.length > 0
    },
    swap(number1, number2) {
      return `${number2}${number1}`
    },
    swap6Numbers(source) {
      var results = Array()
      for (let index = 0; index < 6; index++) {
        const first = source.charAt((0 + index) % 3)
        const second = source.charAt((1 + index) % 3)
        const third = source.charAt((2 + index) % 3)
        const combine = `${first}${second}${third}`
        const isDuplicated = this.checkDuplicatedInList(results, combine)
        if (!isDuplicated) {
          results.push(combine)
        }
        const swaped = this.swap(second, third)
        const combineSwap = `${first}${swaped}`
        const isDuplicatedSwap = this.checkDuplicatedInList(
          results,
          combineSwap
        )
        if (!isDuplicatedSwap) {
          results.push(combineSwap)
        }
      }
      return results
    }
  }
}
</script>
<style scoped>
.container {
  padding: 1em;
  width: 1220px;
  margin: 0 auto;
}
.photos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 1em;
  text-align: center;
}
.photo-item {
  width: 100%;
  height: 256px;
  object-fit: cover;
}
</style>