import { paths } from './routes/paths';
import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  site: {
    name: string;

    basePath: string;
    version: string;
  };
  SITE_URL: string;
  SERVER_URL: string;
  ASSET_URL: string;
  TRANSACTION_COUNT: number;
  redirectPath: string;
  storageTokenKey: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  site: {
    name: 'mineTXC Admin',
    basePath: import.meta.env.VITE_BASE_PATH ?? '',
    version: packageJson.version,
  },
  SITE_URL: import.meta.env.VITE_BASE_URL ?? '',
  SERVER_URL: import.meta.env.VITE_SERVER_URL ?? '',
  ASSET_URL: import.meta.env.VITE_ASSET_URL ?? '',
  TRANSACTION_COUNT: import.meta.env.TRANSACTION_COUNT ?? 150,
  redirectPath: paths.statistics.root,
  storageTokenKey: 'token',
};
