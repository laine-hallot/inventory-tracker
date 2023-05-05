import { FC, useCallback } from 'react';
import React, { useState, useRef } from 'react';

interface NewEntityInputProps {
  handleSave: (data: { name: string }) => void;
}

export const NewEntityInput: FC<NewEntityInputProps> = ({ handleSave }) => {
  const inputRef = useRef<HTMLInputElement>();

  const addEntity = () => handleSave({ name: inputRef.current.value });

  return (
    <div>
      <input
        type="text"
        className="text-input"
        placeholder="Name of new Entity"
        ref={inputRef}
      />
      <button className="btn btn-confirm" onClick={addEntity}>
        Create Entry
      </button>
    </div>
  );
};
