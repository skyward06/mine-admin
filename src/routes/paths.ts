// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  SALES: '/sales',
  MEMBERS: '/miners',
  PRODUCTS: '/products',
  SPONSOR: '/sponsor',
  PLACEMENT: '/placement',
  PROOF: '/proof',
  PREPAID_COMMISSION: '/prepaid-commission',
  COMMISSION: '/commission',
  CALCULATOR: '/calculator',
  REWARD: '/reward',
  RESOURCE: '/resource',
  PAYMENT: '/payment',
  USERS: '/users',
  REPORTS: '/reports',
  WEEKLYREPORTS: '/weekly-reports',
  NOTIFICATIONS: '/notifications',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  signIn: ROOTS.SIGN_IN,

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
    history: {
      root: ROOTS.DASHBOARD,
    },
    members: {
      root: ROOTS.MEMBERS,
      edit: (id: string) => `${ROOTS.MEMBERS}/${id}`,
      new: `${ROOTS.MEMBERS}/new`,
    },
    sales: {
      root: ROOTS.SALES,
      edit: (id: string) => `${ROOTS.SALES}/${id}`,
      new: `${ROOTS.SALES}/new`,
    },
    products: {
      root: ROOTS.PRODUCTS,
      edit: (id: string) => `${ROOTS.PRODUCTS}/${id}`,
      new: `${ROOTS.PRODUCTS}/new`,
    },
    sponsor: { root: ROOTS.SPONSOR },
    placement: { root: ROOTS.PLACEMENT },
    prepaidCommission: {
      root: ROOTS.PREPAID_COMMISSION,
      edit: (id: string) => `${ROOTS.PREPAID_COMMISSION}/${id}`,
      new: `${ROOTS.PREPAID_COMMISSION}/new`,
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
    reward: {
      root: ROOTS.REWARD,
      new: `${ROOTS.REWARD}/new`,
      edit: (id: string) => `${ROOTS.REWARD}/new/${id}`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
      view: (id: string) => `${ROOTS.REWARD}/statistics/${id}`,
    },
    resource: { root: ROOTS.RESOURCE, view: (slug: string) => `${ROOTS.RESOURCE}/${slug}` },
    report: {
      root: ROOTS.REPORTS,
    },
    weeklyReports: {
      root: ROOTS.WEEKLYREPORTS,
    },
    notifications: {
      root: ROOTS.NOTIFICATIONS,
    },
    calculator: {
      root: ROOTS.CALCULATOR,
    },
  },
  notFound: '/404',
};
