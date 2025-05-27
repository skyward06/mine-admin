// ----------------------------------------------------------------------

const ROOTS = {
  LOGS: '/logs',
  PROOF: '/proof',
  ROLES: '/roles',
  SALES: '/sales',
  USERS: '/users',
  PROMOS: '/promos',
  REWARD: '/reward',
  SHARED: '/shared',
  MEMBERS: '/miners',
  REPORTS: '/reports',
  PAYMENT: '/payment',
  SPONSOR: '/sponsor',
  SIGN_IN: '/sign-in',
  INVOICE: '/invoices',
  CAMPAIGN: '/campaign',
  PRODUCTS: '/products',
  RESOURCE: '/resource',
  TEMPLATE: '/template',
  DASHBOARD: '/dashboard',
  PLACEMENT: '/placement',
  BUG_REPORT: '/bug-report',
  COMMISSION: '/commission',
  CALCULATOR: '/calculator',
  STATISTICS: '/statistics',
  PAYMENT_METHOD: '/method',
  SET_ADDRESS: '/set-address',
  AUTO_CAMPAIGN: '/auto-campaign',
  COMMUNICATION: '/communication',
  NOTIFICATIONS: '/notifications',
  WEEKLY_REPORTS: '/weekly-reports',
  GROUP_SETTINGS: '/group-settings',
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
    autoCampaign: {
      new: `${ROOTS.AUTO_CAMPAIGN}/new`,
      edit: (id: string) => `${ROOTS.AUTO_CAMPAIGN}/${id}`,
    },
    bugReport: { root: ROOTS.BUG_REPORT },
    campaign: { edit: (id: string) => `${ROOTS.CAMPAIGN}/${id}` },
    calculator: { root: ROOTS.CALCULATOR },
    commission: {
      root: ROOTS.COMMISSION,
      detail: (id: string) => `${ROOTS.COMMISSION}/${id}`,
    },
    communication: { root: ROOTS.COMMUNICATION },
    groupSettings: {
      root: ROOTS.GROUP_SETTINGS,
      edit: (id: string) => `${ROOTS.GROUP_SETTINGS}/${id}`,
      new: `${ROOTS.GROUP_SETTINGS}/new`,
    },
    history: { root: ROOTS.DASHBOARD },
    invoice: { root: ROOTS.INVOICE },
    logs: { root: ROOTS.LOGS },
    members: {
      root: ROOTS.MEMBERS,
      edit: (id: string) => `${ROOTS.MEMBERS}/${id}`,
      new: `${ROOTS.MEMBERS}/new`,
    },
    notifications: { root: ROOTS.NOTIFICATIONS },
    user: {
      root: ROOTS.USERS,
      edit: (id: string) => `${ROOTS.USERS}/${id}`,
      new: `${ROOTS.USERS}/new`,
    },
    payment: {
      root: ROOTS.PAYMENT,
    },
    paymentMethod: {
      root: ROOTS.PAYMENT_METHOD,
      edit: (id: string) => `${ROOTS.PAYMENT_METHOD}/${id}`,
      new: `${ROOTS.PAYMENT_METHOD}/new`,
    },
    placement: { root: ROOTS.PLACEMENT },
    products: {
      root: ROOTS.PRODUCTS,
      edit: (id: string) => `${ROOTS.PRODUCTS}/${id}`,
      new: `${ROOTS.PRODUCTS}/new`,
    },
    promos: {
      root: ROOTS.PROMOS,
      new: `${ROOTS.PROMOS}/new`,
      edit: (id: string) => `${ROOTS.PROMOS}/${id}`,
    },
    proof: {
      root: ROOTS.PROOF,
      edit: (id: string) => `${ROOTS.PROOF}/${id}`,
      new: `${ROOTS.PROOF}/new`,
    },
    report: { root: ROOTS.REPORTS },
    resource: { root: ROOTS.RESOURCE, view: (slug: string) => `${ROOTS.RESOURCE}/${slug}` },
    reward: {
      root: ROOTS.REWARD,
      new: `${ROOTS.REWARD}/new`,
      edit: (id: string) => `${ROOTS.REWARD}/new/${id}`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
      view: (id: string) => `${ROOTS.REWARD}/statistics/${id}`,
    },
    roles: {
      root: ROOTS.ROLES,
      edit: (id: string) => `${ROOTS.ROLES}/${id}`,
      new: `${ROOTS.ROLES}/new`,
    },
    sales: {
      root: ROOTS.SALES,
      edit: (id: string) => `${ROOTS.SALES}/${id}`,
      log: (id: string) => `${ROOTS.SALES}/log/${id}`,
      new: `${ROOTS.SALES}/new`,
    },
    setAddress: {
      root: ROOTS.SET_ADDRESS,
      new: `${ROOTS.SET_ADDRESS}/new`,
    },
    shared: {
      root: ROOTS.SHARED,
      new: `${ROOTS.SHARED}/new`,
      edit: (id: string) => `${ROOTS.SHARED}/${id}`,
    },
    sponsor: { root: ROOTS.SPONSOR },
    template: {
      root: ROOTS.TEMPLATE,
      new: `${ROOTS.TEMPLATE}/new`,
      edit: (id: string) => `${ROOTS.TEMPLATE}/${id}`,
    },
    weeklyReports: { root: ROOTS.WEEKLY_REPORTS },
  },
  notFound: '/404',
};
