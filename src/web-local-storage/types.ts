export interface LocalStorageEntry<T> {
  id: string;
  data: T;
}

export type StorageRoot = LocalStorageEntry<string>;
export interface DeserializedStorageRoot {
  id: string;
  data: string[];
}

export type InventoryEntity = LocalStorageEntry<{
  name: '';
}>;
