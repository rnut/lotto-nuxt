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
          { title: 'สรุป', link: '/dashboard/admin', logo: '/svg/insights_black_24dp.svg' },
          { title: 'รายการแทง', link: '/transactions/admin', logo: '/svg/receipt_long_black_24dp.svg' },
          { title: 'สมาชิก', link: '/members', logo: '/svg/manage_accounts_black_24dp.svg' },
          { title: 'ตลาด', link: '/markets', logo: '/svg/storefront_black_24dp.svg' },
          { title: 'ตั้งค่า', link: '/settings', logo: '/svg/tune_black_24dp.svg' }
        ]
      case 'agent':
        return [
          { title: 'สรุป', link: '/dashboard/agent', logo: '/svg/insights_black_24dp.svg' },
          { title: 'รายการแทง', link: '/transactions/agent', logo: '/svg/receipt_long_black_24dp.svg' },
          { title: 'สมาชิก', link: '/members', logo: '/svg/manage_accounts_black_24dp.svg' },
        ]
      case 'member':
        return [
          { title: 'สรุป', link: '/dashboard/member', logo: '/svg/insights_black_24dp.svg' },
          { title: 'แทง', link: '/boards', logo: '/svg/casino_black_24dp.svg' },
          { title: 'รายการแทง', link: '/transactions', logo: '/svg/receipt_long_black_24dp.svg' },
        ]
      case 'announcer':
        return [
          { title: 'ประกาศผล', link: '/announces', logo: '/svg/storefront_black_24dp.svg' }
        ]
    }
  }
}