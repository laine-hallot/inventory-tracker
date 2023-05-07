import { NormalizedEntity, NormalizedSupply } from '../storage-types/types';

export interface LocalStorageEntry<T> {
  id: string;
  data: T;
}

export type StorageRoot = LocalStorageEntry<string>;
export interface DeserializedStorageRoot {
  id: string;
  data: string[];
}

export type InventoryEntity = LocalStorageEntry<Omit<NormalizedEntity, 'id'>>;

export type InventorySupply = LocalStorageEntry<Omit<NormalizedSupply, 'id'>>;
