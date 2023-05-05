export interface StorageAdapter {
  getEntities: () => any;
  addEntity: (value: any) => void;
  deleteEntity: (id: string) => void;
}

export interface StorageAdapterConstructor {
  new (): StorageAdapter;
}
