<template>
  <div class="tag-input">
    <div>
      <select
        v-model="selectedMarket"
        @change="onChange()"
        name="market"
        class="tag-input__text"
      >
        <option value="" disabled="disabled" selected>
          Select your markets
        </option>
        <option
          v-for="market in markets"
          :key="market._id"
          v-bind:value="market"
        >
          {{ market.name }}
        </option>
      </select>
    </div>
    <div
      v-for="(tag, index) in tags"
      :key="tag._id"
      class="tag-input__tag p-4 m-1 rounded-lg"
    >
      <span @click="removeTag(index)">x</span>
      {{ tag.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: ['sourceMarkets'],
  data() {
    return {
      markets: this.sourceMarkets,
      selectedMarket: {},
      tags: []
    }
  },
  methods: {
    onChange() {
      const val = this.selectedMarket
      if (typeof val === 'undefined') {
        return
      }
      this.addTag(val)
      this.markets = this.markets.filter((m) => {
        return val._id !== m._id
      })
    },
    addTag(event) {
      this.tags.push(event)
      this.$emit('onSubmitTags', this.tags)
      this.selectedMarket = {}
    },
    removeTag(index) {
      const tag = this.tags[index]
      this.markets.push(tag)
      this.tags.splice(index, 1)
      this.$emit('onSubmitTags', this.tags)
      this.selectedMarket = {}
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    }
  }
}
</script>
<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  float: left;
  background-color: #eee;
  line-height: 30px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
  width: 350px;
  height: 50px;
}
</style>