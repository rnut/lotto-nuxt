<template>
  <div class="p-16">
    <h1 class="text-2xl">create users</h1>
    <section class="mt-10">
      <form class="flex flex-col" @submit="login">
        <div class="flex flex-row gap-4 w-full">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="role"
              >Role</label
            >
            <select
              class="bg-gray-200 rounded text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            >
              <option>Admin</option>
              <option>Agent</option>
              <option>Member</option>
            </select>
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200 w-full">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="username"
              >Username</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
        </div>
        <div class="mb-6 pt-3 rounded bg-gray-200">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 ml-3"
            for="password"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
          />
        </div>
        <div class="flex justify-end"></div>
        <button
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit"
        >
          create user
        </button>
      </form>
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit(value) {
      console.log('submit', value)
    }
  }
}
</script>

<style>
</style>