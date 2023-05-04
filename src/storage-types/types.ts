export interface StorageAdapter {
  getEntities: () => any;
  addEntity: (value: any) => void;
}

export interface StorageAdapterConstructor {
  new (): StorageAdapter;
}
