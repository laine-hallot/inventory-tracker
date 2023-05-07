import { AppSetup } from '../../../it-config';
import {
  NormalizedEntity,
  NormalizedSupply,
} from '../../../storage-types/types';

export const getEntities = (): NormalizedEntity[] => {
  return AppSetup.default.StorageAdapter.getEntities();
};

export const saveEntity = (data): void => {
  AppSetup.default.StorageAdapter.saveEntity(data);
};

export const deleteEntity = (id: string): void => {
  AppSetup.default.StorageAdapter.deleteEntity(id);
};

export const getSupplies = (): NormalizedSupply[] => {
  return AppSetup.default.StorageAdapter.getSupplies();
};

export const saveSupply = (data): void => {
  AppSetup.default.StorageAdapter.saveSupply(data);
};

export const deleteSupply = (id: string): void => {
  AppSetup.default.StorageAdapter.deleteSupply(id);
};
