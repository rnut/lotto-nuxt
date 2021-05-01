<template>
  <section>
    <div>
      <h1 class="text-2xl">จัดการตลาด</h1>
      <button class="w-16 h-16 bg-green-300">
        <nuxt-link to="/markets/new">สร้างตลาด</nuxt-link>
      </button>
    </div>
    <table>
      <colgroup>
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
        <col class="" />
      </colgroup>
      <thead class="v-data-table-header">
        <tr>
          <th
            role="columnheader"
            scope="col"
            aria-label=""
            aria-sort=""
            class="text-start sortable"
          >
            <span>ชื่อตลาด</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
          </th>

          <th
            role="columnheader"
            scope="col"
            aria-label=""
            aria-sort=""
            class="text-start sortable"
          >
            <span>เวลาเปิด</span><i aria-hidden="true" class=""></i>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label=""
            aria-sort=""
            class="text-start sortable"
          >
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
      <tbody>
        <tr class="" v-for="market in markets" :key="market._id">
          <td class="text-start">{{ market.name }}</td>
          <td class="text-start">{{ market.openTime }}</td>
          <td class="text-start">{{ market.closeTime }}</td>
          <td class="text-start">{{ market.isActive }}</td>
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
            <button
              type="button"
              class=""
              aria-haspopup="true"
              aria-expanded="false"
            >
              <nuxt-link :to="`/markets/${market._id}`"> ดูข้อมูล </nuxt-link>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    const url = `${$axios.defaults.baseURL}/markets`
    const resp = await $axios.$get(url)
    const markets = resp.data
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
    }
  }
}
</script>

<style>
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