import React, { useCallback } from 'react';

import { LocalStorage } from '../../../../web-local-storage/storage';
import { NewEntityInput } from './new-entity-input';

export const Entities: React.FC = () => {
  const localStorage = new LocalStorage();
  const entities = localStorage.getEntities();

  const saveEntity = useCallback((data) => localStorage.addEntity(data), []);

  return (
    <div className="text-normal w-full max-w-5xl py-4 px-8">
      <h1 className="text-title mb-4">Entities Page</h1>
      <div className="flex flex-col">
        <NewEntityInput handleSave={saveEntity} />
        {entities.length !== 0 ? (
          entities.map((entity) => (
            <div className="border-b last:border-b-0 border-b-zinc-500 py-4">
              {entity.data.name}
            </div>
          ))
        ) : (
          <div className="">
            <span>No Entities</span>
          </div>
        )}
      </div>
    </div>
  );
};
