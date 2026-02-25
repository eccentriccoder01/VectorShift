// inputNode.js — refactored to use BaseNode

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      outputs={[{ id: 'value' }]}
      headerColor="#6366f1"
    >
      <label className="base-node__field">
        <span>Name</span>
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label className="base-node__field">
        <span>Type</span>
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
