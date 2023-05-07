import type { FC } from 'react';
import React, { useRef } from 'react';

interface NewEntityInputProps {
  handleSave: (data: { name: string }) => void;
  availableParents: any[];
}

export const NewItemInput: FC<NewEntityInputProps> = ({
  handleSave,
  availableParents,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  const addEntity = () => handleSave({ name: inputRef.current.value });

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="text-input"
        placeholder="Name of new Supply"
        ref={inputRef}
      />
      <select className="dropdown" value="">
        <option disabled value="">
          Select an parent entity
        </option>
        {availableParents.map((parentOption, index) => (
          <option key={index} value={parentOption.id}>
            {parentOption.name}
          </option>
        ))}
      </select>
      <button className="btn btn-confirm" onClick={addEntity}>
        Create Item
      </button>
    </div>
  );
};
