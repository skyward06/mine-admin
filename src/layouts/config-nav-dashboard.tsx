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
  dashboard: icon('ic_dashboard'),
  diagram: icon('ic_diagram'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  ecommerce: icon('ic_ecommerce'),
  file: icon('ic_file'),
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
  prepaid: icon('ic_prepaid'),
  reward: icon('ic_reward'),
  report: icon('ic_report'),
  sale: icon('ic_sale'),
  school: icon('ic_school'),
  tour: icon('ic_tour'),
  user: icon('ic_user'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'mineTXC Administration',
    items: [
      { title: 'Dashboard', path: paths.dashboard.history.root, icon: ICONS.analytics },
      { title: 'Miner', path: paths.dashboard.members.root, icon: ICONS.user },
      { title: 'Sale', path: paths.dashboard.sales.root, icon: ICONS.sale },
      { title: 'Product', path: paths.dashboard.products.root, icon: ICONS.package },
      { title: 'Sponsor', path: paths.dashboard.sponsor.root, icon: ICONS.sponsor },
      { title: 'Placement', path: paths.dashboard.placement.root, icon: ICONS.diagram },
      {
        title: 'Prepayment',
        path: paths.dashboard.prepaidCommission.root,
        icon: ICONS.prepaid,
      },
      { title: 'Commission', path: paths.dashboard.commission.root, icon: ICONS.bonus },
      { title: 'Reward', path: paths.dashboard.reward.root, icon: ICONS.reward },
      { title: 'Report', path: paths.dashboard.report.root, icon: ICONS.report },
      { title: 'Admin', path: paths.dashboard.user.root, icon: ICONS.admin },
    ],
  },
];
