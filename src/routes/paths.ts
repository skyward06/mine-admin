// ----------------------------------------------------------------------

const ROOTS = {
  LOGS: '/logs',
  PROOF: '/proof',
  ROLES: '/roles',
  SALES: '/sales',
  USERS: '/users',
  PROMOS: '/promos',
  REWARD: '/reward',
  MEMBERS: '/miners',
  REPORTS: '/reports',
  PAYMENT: '/payment',
  SPONSOR: '/sponsor',
  SIGN_IN: '/sign-in',
  INVOICE: '/invoices',
  CAMPAIGN: '/campaign',
  PRODUCTS: '/products',
  RESOURCE: '/resource',
  TMEPLATE: '/template',
  DASHBOARD: '/dashboard',
  PLACEMENT: '/placement',
  BUG_REPORT: '/bug-report',
  COMMISSION: '/commission',
  CALCULATOR: '/calculator',
  STATISTICS: '/statistics',
  COMMUNICATION: '/communication',
  NOTIFICATIONS: '/notifications',
  WEEKLYREPORTS: '/weekly-reports',
  GROUP_SETTINGS: '/group-settings',
  PAYMENT_METHOD: '/payment-method',
  RESET_PASSWORD: '/reset-password',
  FORGOT_PASSWORD: '/forgot-password',
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
    },
    paymentMethod: {
      root: ROOTS.PAYMENT_METHOD,
      edit: (id: string) => `${ROOTS.PAYMENT_METHOD}/${id}`,
      new: `${ROOTS.PAYMENT_METHOD}/new`,
    },
    groupSettings: {
      root: ROOTS.GROUP_SETTINGS,
      edit: (id: string) => `${ROOTS.GROUP_SETTINGS}/${id}`,
      new: `${ROOTS.GROUP_SETTINGS}/new`,
    },
    roles: {
      root: ROOTS.ROLES,
      edit: (id: string) => `${ROOTS.ROLES}/${id}`,
      new: `${ROOTS.ROLES}/new`,
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
    logs: { root: ROOTS.LOGS },
    report: { root: ROOTS.REPORTS },
    sponsor: { root: ROOTS.SPONSOR },
    history: { root: ROOTS.DASHBOARD },
    communication: { root: ROOTS.COMMUNICATION },
    bugReport: { root: ROOTS.BUG_REPORT },
    template: {
      root: ROOTS.TMEPLATE,
      new: `${ROOTS.TMEPLATE}/new`,
      edit: (id: string) => `${ROOTS.TMEPLATE}/${id}`,
    },
    campaign: { edit: (id: string) => `${ROOTS.CAMPAIGN}/${id}` },
    invoice: { root: ROOTS.INVOICE },
    placement: { root: ROOTS.PLACEMENT },
    calculator: { root: ROOTS.CALCULATOR },
    weeklyReports: { root: ROOTS.WEEKLYREPORTS },
    notifications: { root: ROOTS.NOTIFICATIONS },
    resource: { root: ROOTS.RESOURCE, view: (slug: string) => `${ROOTS.RESOURCE}/${slug}` },
  },
  notFound: '/404',
};
