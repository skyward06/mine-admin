// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  SALES: '/sales',
  MEMBERS: '/miners',
  PRODUCTS: '/products',
  SPONSOR: '/sponsor',
  PLACEMENT: '/placement',
  PROOF: '/proof',
  BALANCE: '/balance',
  COMMISSION: '/commission',
  CALCULATOR: '/calculator',
  REWARD: '/reward',
  RESOURCE: '/resource',
  PAYMENT: '/payment',
  USERS: '/users',
  REPORTS: '/reports',
  PROMOS: '/promos',
  WEEKLYREPORTS: '/weekly-reports',
  NOTIFICATIONS: '/notifications',
  GROUP_SETTINGS: '/group-settings',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    signIn: ROOTS.SIGN_IN,
    forgotPassword: ROOTS.FORGOT_PASSWORD,
    resetPassword: ROOTS.RESET_PASSWORD,
  },

  // STATISTICS
  statistics: { root: ROOTS.STATISTICS },

  // CALCULATOR
  calculator: { root: ROOTS.CALCULATOR },

  // DASHBOARD
  dashboard: {
    root: '/',
    user: {
      root: ROOTS.USERS,
      edit: (id: string) => `${ROOTS.USERS}/${id}`,
      new: `${ROOTS.USERS}/new`,
    },
    members: {
      root: ROOTS.MEMBERS,
      edit: (id: string) => `${ROOTS.MEMBERS}/${id}`,
      new: `${ROOTS.MEMBERS}/new`,
    },
    sales: {
      root: ROOTS.SALES,
      edit: (id: string) => `${ROOTS.SALES}/${id}`,
      log: (id: string) => `${ROOTS.SALES}/log/${id}`,
      new: `${ROOTS.SALES}/new`,
    },
    products: {
      root: ROOTS.PRODUCTS,
      edit: (id: string) => `${ROOTS.PRODUCTS}/${id}`,
      new: `${ROOTS.PRODUCTS}/new`,
    },
    balance: {
      root: ROOTS.BALANCE,
      new: `${ROOTS.BALANCE}/new`,
    },
    commission: {
      root: ROOTS.COMMISSION,
      detail: (id: string) => `${ROOTS.COMMISSION}/${id}`,
    },
    proof: {
      root: ROOTS.PROOF,
      edit: (id: string) => `${ROOTS.PROOF}/${id}`,
      new: `${ROOTS.PROOF}/new`,
    },
    payment: {
      root: ROOTS.PAYMENT,
      edit: (id: string) => `${ROOTS.PAYMENT}/${id}`,
      new: `${ROOTS.PAYMENT}/new`,
    },
    groupSettings: {
      root: ROOTS.GROUP_SETTINGS,
      edit: (id: string) => `${ROOTS.GROUP_SETTINGS}/${id}`,
      new: `${ROOTS.GROUP_SETTINGS}/new`,
    },
    reward: {
      root: ROOTS.REWARD,
      new: `${ROOTS.REWARD}/new`,
      edit: (id: string) => `${ROOTS.REWARD}/new/${id}`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
      view: (id: string) => `${ROOTS.REWARD}/statistics/${id}`,
    },
    promos: {
      root: ROOTS.PROMOS,
      new: `${ROOTS.PROMOS}/new`,
      edit: (id: string) => `${ROOTS.PROMOS}/${id}`,
    },
    report: { root: ROOTS.REPORTS },
    sponsor: { root: ROOTS.SPONSOR },
    history: { root: ROOTS.DASHBOARD },
    placement: { root: ROOTS.PLACEMENT },
    calculator: { root: ROOTS.CALCULATOR },
    weeklyReports: { root: ROOTS.WEEKLYREPORTS },
    notifications: { root: ROOTS.NOTIFICATIONS },
    resource: { root: ROOTS.RESOURCE, view: (slug: string) => `${ROOTS.RESOURCE}/${slug}` },
  },
  notFound: '/404',
};
