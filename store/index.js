export const state = () => ({
  counter: 0,
})
export const mutations = {
  increment (state) {
    state.counter++
  },
}
export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },

  loggedInUser (state) {
    return state.auth.user
  },

  navigations (state) {
    switch (state.auth.user.role) {
      case 'admin':
        return [
          { title: 'สรุป', link: '/dashboard/admin' },
          { title: 'รายการแทง', link: '/transactions/admin' },
          { title: 'สมาชิก', link: '/members' },
          { title: 'ตลาด', link: '/markets' },
          { title: 'ตั้งค่า', link: '/settings' }
        ]
      case 'agent':
        return [
          { title: 'สรุป', link: '/dashboard/agent' },
          { title: 'รายการแทง', link: '/transactions/agent' },
          { title: 'สมาชิก', link: '/members' },
        ]
      default:
        return [
          { title: 'สรุป', link: '/dashboard/member' },
          { title: 'แทง', link: '/boards' },
          { title: 'รายการแทง', link: '/transactions' },
        ]
    }
  }
}