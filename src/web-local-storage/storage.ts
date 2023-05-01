import { v4 as uuidV4 } from 'uuid';

const deserializeStorageRoot = (
  rootData: string
): Record<string, string | null> => {
  return Object.fromEntries(rootData.split(',').map((elm) => [elm, null]));
};

export class LocalStorage {
  private rootData: Record<string, string | null>;

  constructor() {
    let serializedRootData = localStorage.getItem('root');
    if (serializedRootData === null) {
      serializedRootData = '';
      localStorage.setItem('root', serializedRootData);
    }
    this.rootData = deserializeStorageRoot(serializedRootData);
  }

  /**
   *
   * @param itemId UUID of item you want to add to the root storage object
   */
  addToRootData(itemId: string): void {
    console.log(this.rootData[itemId]);
    if (this.rootData[itemId] === undefined) {
      this.rootData[itemId] = null;
      localStorage.setItem('root', Object.keys(this.rootData).join(','));
    }
  }

  removeFromRootData(itemId: string): void {
    const { [itemId]: removedItem, ...restOfData } = this.rootData;
    this.rootData = restOfData;
    localStorage.setItem('root', Object.keys(this.rootData).join(','));
  }

  getEntities() {
    const needsRemoval: string[] = [];

    const serializedEntities = Object.keys(this.rootData)
      .map((elm) => {
        const elementData = localStorage.getItem(elm);
        if (elementData === null) {
          needsRemoval.push(elm);
        }
        return { id: elm, data: elementData };
      })
      .filter((elm) => elm.data !== null);

    if (needsRemoval.length > 0) {
      needsRemoval.forEach((elm) => this.removeFromRootData(elm));
    }

    const entities = serializedEntities.map((entity) => {
      return { id: entity.id, data: JSON.parse(entity.data) };
    });

    return entities;
  }

  addEntity(data: any): void {
    const entityUuid = uuidV4();
    localStorage.setItem(entityUuid, JSON.stringify(data));

    this.addToRootData(entityUuid);
  }
}
