export function showMember (id) {
    // const url = `${this.$axios.defaults.baseURL}/users/${m._id}`
    // return { members }
}

export async function getMembers () {
    const url = `${$axios.defaults.baseURL}/users`
    return await $axios.$get()
}