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
          { title: 'สรุป', link: '/admin/dashboard' },
          { title: 'รายการแทง', link: '/admin/bills' },
          { title: 'จัดการสมาชิก', link: '/members' },
          { title: 'จัดการตลาด', link: '/markets' }]
      case 'agent':
        return []
      default:
        return [
          { title: 'สรุป', link: '/dashboard/member' },
          { title: 'แทง', link: '/boards' },
          { title: 'รายการแทง', link: '/transactions' },
        ]
    }
  }
}