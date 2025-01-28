import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';

import { SvgColor } from 'src/components/SvgColor';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  admin: icon('ic_admin'),
  analytics: icon('ic_analytics'),
  banking: icon('ic_banking'),
  blog: icon('ic_blog'),
  blank: icon('ic_blank'),
  bonus: icon('ic_bonus'),
  booking: icon('ic_booking'),
  calendar: icon('ic_calendar'),
  chat: icon('ic_chat'),
  calculator: icon('ic_calculator'),
  dashboard: icon('ic_dashboard'),
  diagram: icon('ic_diagram'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  ecommerce: icon('ic_ecommerce'),
  file: icon('ic_file'),
  groupSettings: icon('ic_group_settings'),
  folder: icon('ic_folder'),
  invoice: icon('ic_invoice'),
  job: icon('ic_job'),
  kanban: icon('ic_kanban'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  mail: icon('ic_mail'),
  menuItem: icon('ic_menu_item'),
  order: icon('ic_order'),
  sponsor: icon('ic_sponsor'),
  product: icon('ic_product'),
  package: icon('ic_package'),
  payment: icon('ic_payment'),
  prepaid: icon('ic_prepaid'),
  proof: icon('ic_proof'),
  reward: icon('ic_reward'),
  report: icon('ic_report'),
  sale: icon('ic_sale'),
  school: icon('ic_school'),
  tour: icon('ic_tour'),
  user: icon('ic_user'),
  weeklyReport: icon('ic_weekly_report'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */

  {
    subheader: 'Overview',
    items: [{ title: 'Dashboard', path: paths.dashboard.history.root, icon: ICONS.analytics }],
  },

  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      { title: 'Miner', path: paths.dashboard.members.root, icon: ICONS.user },
      { title: 'Sale', path: paths.dashboard.sales.root, icon: ICONS.sale },
      { title: 'Placement', path: paths.dashboard.placement.root, icon: ICONS.diagram },
      { title: 'Commission', path: paths.dashboard.commission.root, icon: ICONS.bonus },
      { title: 'Proof', path: paths.dashboard.proof.root, icon: ICONS.proof },
      {
        title: 'Group Settings',
        path: paths.dashboard.groupSettings.root,
        icon: ICONS.groupSettings,
      },
      { title: 'Admin', path: paths.dashboard.user.root, icon: ICONS.admin },
    ],
  },

  /**
   * Addition
   */
  {
    subheader: 'Addition',
    items: [
      { title: 'Product', path: paths.dashboard.products.root, icon: ICONS.package },
      { title: 'Payment Method', path: paths.dashboard.payment.root, icon: ICONS.payment },
    ],
  },

  /**
   * Services
   */
  {
    subheader: 'Services',
    items: [
      { title: 'Resource', path: paths.dashboard.resource.root, icon: ICONS.folder },
      { title: 'Promos', path: paths.dashboard.promos.root, icon: ICONS.folder },
      { title: 'Reward', path: paths.dashboard.reward.root, icon: ICONS.reward },
      { title: 'Sponsor', path: paths.dashboard.sponsor.root, icon: ICONS.sponsor },
      {
        title: 'Prepayment',
        path: paths.dashboard.prepaidCommission.root,
        icon: ICONS.prepaid,
      },
      { title: 'Calculator', path: paths.calculator.root, icon: ICONS.calculator },
      { title: 'Report', path: paths.dashboard.report.root, icon: ICONS.report },
      {
        title: 'Weekly Report',
        path: paths.dashboard.weeklyReports.root,
        icon: ICONS.weeklyReport,
      },
    ],
  },
];
