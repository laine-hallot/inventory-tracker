import React, { useCallback, useState } from 'react';
import { NewEntityInput } from './new-entity-input';
import { deleteEntity, getEntities, saveEntity } from '../../util/actions';

export const Entities: React.FC = () => {
  const [entities, setEntities] = useState<any>(getEntities());

  const handleSave = useCallback(
    (value) => {
      saveEntity(value);
      setEntities(getEntities());
    },
    [saveEntity, getEntities]
  );

  const handleDelete = useCallback(
    (id) => () => {
      deleteEntity(id);
      setEntities(getEntities());
    },
    [saveEntity, getEntities]
  );

  return (
    <div className="text-normal w-full max-w-5xl py-4 px-8">
      <h1 className="text-title mb-4">Entities Page</h1>
      <div className="flex flex-col">
        <NewEntityInput handleSave={handleSave} />
        {entities && entities.length !== 0 ? (
          entities.map((entity) => (
            <div className="border-b last:border-b-0 border-b-zinc-500 py-4 flex">
              <span className="flex-1">{entity.data.name}</span>
              <div>
                <button onClick={handleDelete(entity.id)}>X</button>
              </div>
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
