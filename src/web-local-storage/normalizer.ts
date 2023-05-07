import { NormalizedEntity, NormalizedSupply } from '../storage-types/types';
import { InventoryEntity, InventorySupply } from './types';

export const deserializeStorageRoot = (
  rootData: string
): Record<string, string | null> => {
  return Object.fromEntries(rootData.split(',').map((elm) => [elm, null]));
};

export const deserializeEntity = (entity: { id: string; data: string }) => {
  return { id: entity.id, data: JSON.parse(entity.data) };
};
export const deserializeSupply = (entity: { id: string; data: string }) => {
  return { id: entity.id, data: JSON.parse(entity.data) };
};

export const serializeEntity = (entityData: Omit<NormalizedEntity, 'id'>) => {
  return JSON.stringify(entityData);
};

export const serializeSupply = (supplyData: Omit<NormalizedSupply, 'id'>) => {
  return JSON.stringify(supplyData);
};

export const normalizeEntity = (entity: InventoryEntity): NormalizedEntity => {
  return { id: entity.id, ...entity.data };
};

export const normalizeSupply = (supply: InventorySupply): NormalizedSupply => {
  return { id: supply.id, ...supply.data };
};

export const denormalizeEntity = (
  entity: NormalizedEntity
): InventoryEntity => {
  const { id, ...entityData } = entity;
  return { id, data: entityData };
};

export const denormalizeSupply = (
  supply: NormalizedEntity
): InventoryEntity => {
  const { id, ...supplyData } = supply;
  return { id, data: supplyData };
};
