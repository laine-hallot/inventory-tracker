import type { StorageAdapter as StorageAdapterType } from '../storage-types/types';

let StorageAdapter;

export default (function () {
  return {
    get StorageAdapter(): StorageAdapterType {
      return StorageAdapter;
    },
    set StorageAdapter(value: StorageAdapterType) {
      StorageAdapter = value;
    },
  };
})();
