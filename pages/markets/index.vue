<template>
  <section>
    <div>
      <!-- // table-content -->
      <section class="p-8">
        <div class="flex gap-4 items-center">
          <h1 class="text-2xl py-4 font-bold text-purple-800">จัดการตลาด</h1>
          <nuxt-link to="/markets/new">
            <button
              class="rounded bg-green-500 flex p-2 hover:bg-green-700 hover:ring-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
              </svg>
              <span class="text-white"> สร้างตลาด </span>
            </button>
          </nuxt-link>
        </div>
        <div class="bg-purple-600 rounded">
          <table
            class="table-auto w-full"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <thead>
              <tr>
                <th>รูปตลาด</th>
                <th class="text-start sortable">
                  <span>ชื่อตลาด</span>
                </th>
                <th class="text-start">
                  <span>เวลาเปิด</span><i aria-hidden="true" class=""></i>
                </th>
                <th class="text-start">
                  <span>เวลาปิด</span><i aria-hidden="true" class=""></i>
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  aria-label="สถานะ: Not sorted. Activate to sort ascending."
                  aria-sort="none"
                  class="text-start sortable"
                >
                  <span>สถานะ</span
                  ><i
                    aria-hidden="true"
                    class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
                    style="font-size: 18px"
                  ></i>
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  aria-label="Actions"
                  class="text-start"
                >
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-purple-100 cursor-pointer">
              <tr
                :style="{ 'background-color': market.color }"
                v-for="market in markets"
                :key="market._id"
              >
                <td>
                  <img
                    :src="getMarketAvatar(market)"
                    alt="market_avatar"
                    class="h-auto w-8 mx-auto shadow-md"
                  />
                </td>
                <td class="text-start" :style="{ color: market.fontColor }">
                  {{ market.name }}
                </td>
                <td class="text-start" :style="{ color: market.fontColor }">
                  {{ market.openTime }}
                </td>
                <td class="text-start" :style="{ color: market.fontColor }">
                  {{ market.closeTime }}
                </td>
                <td class="text-start">
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="market.isActive"
                      v-on:change="onChangeActive(market)"
                    />
                    <div class="slider round">
                      <span class="on">เปิด</span>
                      <span class="off">ปิด</span>
                    </div>
                  </label>
                </td>
                <td class="text-start">
                  <button type="button" class="">
                    <nuxt-link :to="`/markets/${market._id}`">
                      <div
                        class="bg-purple-500 flex items-center px-3 py-2 rounded hover:bg-purple-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                          />
                        </svg>
                        <span class="m-2 text-white"> ตั้งค่า </span>
                      </div>
                    </nuxt-link>
                  </button>

                  <button type="button">
                    <nuxt-link :to="`/markets/results/${market._id}`">
                      <div
                        class="bg-green-500 flex items-center px-3 py-2 rounded hover:bg-green-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                          />
                        </svg>
                        <span class="m-2 text-white"> ประกาศรางวัล </span>
                      </div>
                    </nuxt-link>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp
    return { markets }
  },
  methods: {
    async onChangeActive(m) {
      const activeStatus = !m.isActive
      const payload = {
        isActive: activeStatus
      }
      const url = `${this.$axios.defaults.baseURL}/markets/${m._id}`
      await this.$axios.$patch(url, payload)
      m.isActive = activeStatus
    },
    getMarketAvatar(market) {
      const baseImageURL = process.env.BASE_IMAGE_URL
      if (typeof market.avatar === 'undefined') {
        return `/logos/logo.svg`
      } else {
        return `${baseImageURL}${market.avatar}`
      }
    }
  }
}
</script>

<style scoped>
.slot {
  background-color: #aaa;
  padding: 0.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal {
  z-index: 1000;
  transition: opacity 0.25s ease;
}
.modal-active {
  overflow-x: hidden;
  overflow-y: visible !important;
}
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ca2222;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>