import { v4 as uuidV4 } from 'uuid';
import {
  NormalizedEntity,
  NormalizedSupply,
  StorageAdapter,
} from '../storage-types/types';
import {
  deserializeEntity,
  deserializeStorageRoot,
  deserializeSupply,
  normalizeEntity,
  normalizeSupply,
  serializeSupply,
} from './normalizer';

// TODO: Remove duplicate code, this file is a mess
export class LocalStorage implements StorageAdapter {
  private trackers: Record<string, Record<string, string | null>> = {
    entityTracker: {},
    supplyTracker: {},
  };

  constructor() {
    let serializedRootData = localStorage.getItem('entityTracker');
    if (serializedRootData === null) {
      serializedRootData = '';
      localStorage.setItem('entityTracker', serializedRootData);
    }
    this.trackers.entityTracker = deserializeStorageRoot(serializedRootData);

    let serializedSupplyTracker = localStorage.getItem('supplyTracker');
    if (serializedSupplyTracker === null) {
      serializedSupplyTracker = '';
      localStorage.setItem('supplyTracker', serializedSupplyTracker);
    }
    this.trackers.supplyTracker = deserializeStorageRoot(
      serializedSupplyTracker
    );
  }

  /**
   *
   * @param itemId UUID of item you want to add to the root storage object
   */
  addToTracker(trackerName: string, itemId: string): void {
    const activeTracker = this.trackers[trackerName];
    if (activeTracker[itemId] === undefined) {
      activeTracker[itemId] = null;
      localStorage.setItem(trackerName, Object.keys(activeTracker).join(','));
    }
  }

  removeFromTracker(trackerName: string, itemId: string): void {
    let activeTracker = this.trackers[trackerName];
    const { [itemId]: removedItem, ...restOfData } = activeTracker;
    activeTracker = restOfData;
    localStorage.setItem(trackerName, Object.keys(activeTracker).join(','));
  }

  getEntities(): NormalizedEntity[] {
    const needsRemoval: string[] = [];

    const serializedEntities = Object.keys(this.trackers.entityTracker)
      .map((elm) => {
        const elementData = localStorage.getItem(elm);
        if (elementData === null) {
          needsRemoval.push(elm);
        }
        return { id: elm, data: elementData };
      })
      .filter((elm) => elm.data !== null);

    if (needsRemoval.length > 0) {
      needsRemoval.forEach((elm) =>
        this.removeFromTracker('entityTracker', elm)
      );
    }

    const entities = serializedEntities.map((entity) => {
      return normalizeEntity(
        deserializeEntity({ id: entity.id, data: entity.data })
      );
    });

    return entities;
  }

  getEntity: (id: string) => NormalizedEntity;

  saveEntity(data: any): void {
    const entityUuid = uuidV4();
    localStorage.setItem(entityUuid, JSON.stringify(data));

    this.addToTracker('entityTracker', entityUuid);
  }

  deleteEntity(id: string): void {
    localStorage.removeItem(id);
    this.removeFromTracker('entityTracker', id);
  }

  getSupplies(): NormalizedSupply[] {
    const needsRemoval: string[] = [];

    const serializedSupplies = Object.keys(this.trackers.supplyTracker)
      .map((supply) => {
        const elementData = localStorage.getItem(supply);
        if (elementData === null) {
          needsRemoval.push(supply);
        }
        return { id: supply, data: elementData };
      })
      .filter((supply) => supply.data !== null);

    if (needsRemoval.length > 0) {
      needsRemoval.forEach((supply) =>
        this.removeFromTracker('supplyTracker', supply)
      );
    }
    const supplies = serializedSupplies.map((supply) => {
      return normalizeSupply(
        deserializeSupply({ id: supply.id, data: supply.data })
      );
    });

    return supplies;
  }

  getSupply: (id: string) => NormalizedSupply;

  saveSupply(value: Omit<NormalizedSupply, 'id'>) {
    const serializedParentEntity = localStorage.getItem(value.parentId);
    if (serializedParentEntity !== null) {
      const parentEntity = deserializeEntity({
        id: value.parentId,
        data: serializedParentEntity,
      });
      const supplyUuid = uuidV4();

      parentEntity.data.children.push(supplyUuid);
      localStorage.setItem(parentEntity.id, JSON.stringify(parentEntity.data));
      this.addToTracker('supplyTracker', supplyUuid);

      localStorage.setItem(supplyUuid, serializeSupply(value));
    }
  }

  deleteSupply: (id: string) => void;

  getEntitySupplies(entityId: string): NormalizedSupply[] {
    const serializedEntity = localStorage.getItem(entityId);
    if (serializedEntity !== null) {
      const entity = normalizeEntity(
        deserializeEntity({ id: entityId, data: serializedEntity })
      );

      const needsRemoval: string[] = [];

      const serializedSupplies = entity.children
        .map((supply) => {
          const elementData = localStorage.getItem(supply);
          if (elementData === null) {
            needsRemoval.push(supply);
          }
          return { id: supply, data: elementData };
        })
        .filter((supply) => supply.data !== null);

      if (needsRemoval.length > 0) {
        needsRemoval.forEach((supply) =>
          this.removeFromTracker('supplyTracker', supply)
        );
      }
      const supplies = serializedSupplies.map((supply) => {
        return normalizeSupply(
          deserializeSupply({ id: supply.id, data: supply.data })
        );
      });

      return supplies;
    }
  }
}
