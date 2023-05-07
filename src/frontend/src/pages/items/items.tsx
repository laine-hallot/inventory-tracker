import React, { useCallback, useState } from 'react';
import { NewItemInput } from './new-item-input';
import {
  deleteSupply,
  getEntities,
  getSupplies,
  saveSupply,
} from '../../util/actions';

export const Items: React.FC = () => {
  const [entities, setEntities] = useState<any>(getEntities());
  const [supplies, setSupplies] = useState<any>(getSupplies());

  const handleSave = useCallback(
    (value) => {
      saveSupply(value);
      setEntities(getEntities());
      setSupplies(getSupplies());
    },
    [saveSupply, getEntities]
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      deleteSupply(id);
      setEntities(getEntities());
      setSupplies(getSupplies());
    },
    [deleteSupply, getEntities]
  );

  return (
    <div className="text-normal w-full max-w-5xl py-4 px-8">
      <h1 className="text-title mb-4">Items</h1>
      <div className="flex flex-col">
        <NewItemInput handleSave={handleSave} availableParents={entities} />
        {supplies && supplies.length !== 0 ? (
          supplies.map((supply, index) => (
            <div
              key={index}
              className="border-b last:border-b-0 border-b-zinc-500 py-4 flex"
            >
              <span className="flex-1">{supply.name}</span>
              <div>
                <button onClick={handleDelete(supply.id)}>X</button>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <span>No Items</span>
          </div>
        )}
      </div>
    </div>
  );
};
