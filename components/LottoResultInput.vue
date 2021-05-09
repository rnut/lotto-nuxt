<template>
  <div class="tag-input">
    <div
      v-for="(tag, index) in lottoResult.result"
      :key="tag"
      v-bind:class="{
        'bg-purple-500 text-white': !inactive,
        'bg-gray-300 text-gray-800': inactive
      }"
      class="input__tag p-1"
    >
      <span v-if="!inactive" @click="removeTag(index)">x</span>
      {{ tag }}
    </div>
    <input
      v-if="!inactive"
      type="text"
      placeholder="ระบุหมายเลขรางวัล"
      class="tag-input__text"
      @keydown.enter="addTag"
      @keydown.188="addTag"
      @keydown.delete="removeLastTag"
    />
  </div>
</template>
<script>
export default {
  props: ['lottoResult', 'inactive'],
  data() {
    return {
      tags: []
    }
  },
  methods: {
    addTag(event) {
      event.preventDefault()
      var val = event.target.value.trim()
      if (val.length > 0 && !this.tags.includes(val)) {
        this.tags.push(val)
        event.target.value = ''
        this.lottoResult.result = this.tags
        this.$emit('onSubmitResult', this.lottoResult)
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
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
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
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
}
</style>