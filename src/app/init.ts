import type { ITEnv } from '../it-config/types';

import { AppSetup } from '../it-config';

export const initInventoryTracker = (env: ITEnv) => {
  AppSetup.default.StorageAdapter = new env.storage();
};
