import { AppSetup } from '../../../it-config';
import { InventoryEntity } from '../../../web-local-storage/types';

export const getEntities = (): InventoryEntity => {
  return AppSetup.default.StorageAdapter.getEntities();
};

export const saveEntity = (data): void => {
  AppSetup.default.StorageAdapter.addEntity(data);
};
