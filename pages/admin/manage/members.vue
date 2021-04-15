<template>
  <section>
    <h1 class="text-2xl">จัดการสมาชิก</h1>
    <pre>
        {{ members }}
    </pre>
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
            aria-label="ยูเซอร์เนม: Not sorted. Activate to sort ascending."
            aria-sort="none"
            class="text-start sortable"
          >
            <span>ยูเซอร์เนม</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label="ชื่อเล่น: Not sorted. Activate to sort ascending."
            aria-sort="none"
            class="text-start sortable"
          >
            <span>ชื่อเล่น</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label="ระดับ: Not sorted. Activate to sort ascending."
            aria-sort="none"
            class="text-start sortable"
          >
            <span>ระดับ</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label="ผู้สร้าง: Not sorted. Activate to sort ascending."
            aria-sort="none"
            class="text-start sortable"
          >
            <span>ผู้สร้าง</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
          </th>
          <th
            role="columnheader"
            scope="col"
            aria-label="แจ้งชำระเงิน: Not sorted. Activate to sort ascending."
            aria-sort="none"
            class="text-start sortable"
          >
            <span>แจ้งชำระเงิน</span
            ><i
              aria-hidden="true"
              class="v-icon notranslate v-data-table-header__icon mdi mdi-arrow-up theme--light"
              style="font-size: 18px"
            ></i>
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
        <tr class="" v-for="member in members" :key="member.name">
          <td class="text-start">{{ member.username }}</td>
          <td class="text-start">{{ member.name }}</td>
          <td class="text-start">{{ member.role }}</td>
          <td class="text-start">{{ member.createdBy.name }}</td>
          <td class="text-start">
            <label class="switch">
              <input type="checkbox" />
              <div class="slider round">
                <span class="on">ได้</span>
                <span class="off">ไม่ได้</span>
              </div>
            </label>
          </td>
          <td class="text-start">
            <label class="switch">
              <input type="checkbox" :checked="member.isActive" />
              <div class="slider round">
                <span class="on">ปกติ</span>
                <span class="off">ปิด</span>
              </div>
            </label>
          </td>
          <td class="text-start">
            <button
              type="button"
              class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--x-small"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="v-btn__content"
                ><i
                  aria-hidden="true"
                  class="v-icon notranslate v-icon--dense mdi mdi-pencil theme--light amber--text"
                  style="font-size: 16px"
                ></i
              ></span></button
            ><span class="v-tooltip v-tooltip--top"><!----></span>
            <span class="v-tooltip v-tooltip--top"><!----></span
            ><button
              type="button"
              class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--x-small"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="v-btn__content"
                ><i
                  aria-hidden="true"
                  class="v-icon notranslate v-icon--dense mdi mdi-delete theme--light red--text"
                  style="font-size: 16px"
                ></i
              ></span>
            </button>
            <!---->
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const members = await $axios.$get('http://localhost:8080/api/v1/users')
    return { members }
  }
}
</script>

<style>
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

/*------ ADDED CSS ---------*/
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

/*--------- END --------*/

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>