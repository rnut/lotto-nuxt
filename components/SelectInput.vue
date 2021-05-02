<template>
  <div class="tag-input">
    <div>
      <select
        v-model="selectedMarket"
        @change="onChange()"
        class="tag-input__text"
      >
        <option value="" disabled selected>Select your markets</option>
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
      tags: [
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607cb3f4879a6c0596b086fe',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 05:30',
          openTime: '05:30',
          closeTime: '23:59',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607cb45d879a6c0596b086ff',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 05:37',
          openTime: '05:37',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607cb824f15aee05c3e6aa35',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 05:53',
          openTime: '05:53',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce5094a93570b67a82866',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:04',
          openTime: '09:04',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce50c4a93570b67a82867',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:04',
          openTime: '09:04',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce5134a93570b67a8288a',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:05',
          openTime: '09:05',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce5144a93570b67a8288b',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:05',
          openTime: '09:05',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce5144a93570b67a8288c',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:05',
          openTime: '09:05',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce74ab15fe30c10e9ac4f',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:14',
          openTime: '09:14',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce755b15fe30c10e9ac50',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:14',
          openTime: '09:14',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce755b15fe30c10e9ac51',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:14',
          openTime: '09:14',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce756b15fe30c10e9ac52',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:14',
          openTime: '09:14',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce75eb15fe30c10e9ac53',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce75eb15fe30c10e9ac54',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce75fb15fe30c10e9ac55',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce760b15fe30c10e9ac56',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce760b15fe30c10e9ac57',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce761b15fe30c10e9ac58',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce761b15fe30c10e9ac59',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce762b15fe30c10e9ac5a',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce762b15fe30c10e9ac5b',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607ce763b15fe30c10e9ac5c',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 09:15',
          openTime: '09:15',
          closeTime: '01:10',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607e105bac0c650874b5197b',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 01.00',
          openTime: '05:32',
          closeTime: '05:32',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        },
        {
          isActive: false,
          isDelete: false,
          deletedAt: null,
          _id: '607e11644969d108b84ee12d',
          color: '#f48fb1ff',
          name: 'ฮานอย เสาร์-อาทิตย์ รอบ (1) 01.00',
          openTime: '05:00',
          closeTime: '16:00',
          updatedBy: {
            isActive: true,
            cans: [],
            _id: '6076296e15d84b11ae664d77',
            username: 'mimi',
            role: 'admin',
            name: 'mimi',
            lineID: 'ddiief',
            mobileNumber: '909909230',
            __v: 20,
            lottos: []
          }
        }
      ]
    }
  },
  methods: {
    onChange() {
      console.log('onChange: ')
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