export interface StorageAdapter {
  getEntities: () => NormalizedEntity[];
  saveEntity: (value: NormalizedEntity) => void;
  deleteEntity: (id: string) => void;
  getEntity: (id: string) => NormalizedEntity;

  getSupplies: () => NormalizedSupply[];
  getSupply: (id: string) => NormalizedSupply;
  saveSupply: (value: NormalizedSupply) => void;
  deleteSupply: (id: string) => void;
  getEntitySupplies: (entityId: string) => NormalizedSupply[];
}

export interface StorageAdapterConstructor {
  new (): StorageAdapter;
}

export interface NormalizedEntity {
  id: string;
  name: string;
  children: string[];
  unit: string;
}

export interface NormalizedSupply {
  id: string;
  name: string;
  parentId: string;
  unit: string;
  measurement: string;
  quantity: number;
}

export interface NormalizedDrain {
  id: string;
  name: string;
  parentIds: string[];
  unit: string;
  rate?: TimePeriod;
}

export interface TimePeriod {
  amount: number;
  period:
    | 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year';
}
