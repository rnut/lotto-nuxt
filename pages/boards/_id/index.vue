<template>
  <div class="lg:p-16">
    <div class="divide-y-2 divide-purple-600 divide-solid">
      <div class="font-extrabold text-2xl text-purple-600 py-3">Boards</div>
      <div class="h-16"></div>
    </div>
    <div class="m-4 grid lg:grid-cols-5 lg:gap-16 sm:grid-cols-1">
      <div class="">
        <p class="text-sm underline">สรุปรายการ</p>

        <div class="grid grid-cols-5 gap-8 bg-purple-200">
          <div class="py-3 text-center">ประเภท</div>
          <div class="py-3 text-center">หมายเลข</div>
          <div class="py-3 text-center">ยอด</div>
          <div class="py-3 text-center">เรทจ่าย</div>
          <div class="py-3 text-center">ส่วนลด</div>
        </div>
        <hr />
        <div class="divide-y-2 divide-purple-200 divide-solid">
          <div
            v-for="lotto in lottos"
            :key="lotto.id"
            class="grid grid-cols-5 gap-8"
          >
            <div class="py-3">{{ lotto.type }}</div>
            <div class="py-3">{{ lotto.number }}</div>
            <div class="py-3">{{ lotto.price }}</div>
            <div class="py-3">{{ lotto.reward }}</div>
            <div class="py-3">{{ lotto.sale }}</div>
          </div>
        </div>

        <!-- <div class="divide-y-2 divide-purple-600 divide-solid"></div> -->
      </div>
      <div class="col-span-2 sm:mt-16">
        <div class="bg-white">
          <nav class="flex flex-col sm:flex-row">
            <button
              v-on:click="toggleTabs(1)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 1,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 1
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              2 ตัว
            </button>
            <button
              v-on:click="toggleTabs(2)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 2,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 2
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              3 ตัว
            </button>
            <button
              v-on:click="toggleTabs(3)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 3,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 3
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              6 กลับ
            </button>
            <button
              v-on:click="toggleTabs(4)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 4,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 4
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              19 ประตู
            </button>
            <button
              v-on:click="toggleTabs(5)"
              v-bind:class="{
                'text-purple-800 bg-white': openTab !== 5,
                'bg-purple-600 border-b-4 border-purple-300 text-white':
                  openTab === 5
              }"
              class="font-medium py-4 px-6 block hover:text-purple-500 focus:outline-none text-white-500"
            >
              วิ่ง
            </button>
          </nav>
        </div>
        <div class="relative bg-indigo-200">
          <transition name="fade ">
            <TwoNumber v-show="openTab === 1" class="absolute" />
          </transition>
          <!-- <TwoNumber
        v-bind:class="{
          'transition -translate-y-full opacity-0 ease-out duration-300 motion-reduce:transition-none motion-reduce:transform-none hidden':
            openTab !== 1,
          'block transform opacity-100 visible ease-in duration-500':
            openTab === 1
        }"
      /> -->
          <transition name="fade">
            <ThreeNumber v-show="openTab === 2" class="absolute" />
          </transition>
          <transition name="fade">
            <SixNumber v-show="openTab === 3" class="absolute" />
          </transition>
          <transition name="fade">
            <NineTeenNumber v-show="openTab === 4" class="absolute" />
          </transition>
          <transition name="fade">
            <OneNumber v-show="openTab === 5" class="absolute" />
          </transition>
          <!-- <SixNumber/> -->
          <!-- <NineTeenNumber /> -->
          <!-- <OneNumber
      v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }"
      @onSubmited="onSubmit"
    /> -->
        </div>
      </div>
      <div class="col-span-2"></div>
    </div>
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
  data() {
    return {
      openTab: 1,
      lottos: [
        { type: '2 ตัวบน', number: 32, price: 100, reward: 92, sale: 8 },
        { type: '2 ตัวบน', number: 13, price: 100, reward: 92, sale: 8 },
        { type: '2 ตัวบน', number: 23, price: 100, reward: 92, sale: 8 },
        { type: '2 ตัวบน', number: 45, price: 100, reward: 92, sale: 8 },
        { type: '2 ตัวบน', number: 67, price: 100, reward: 92, sale: 8 }
      ]
    }
  },
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    },
    toggleTabs(tabNumber) {
      this.openTab = tabNumber
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition: opacity 1.25s ease;
}
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>