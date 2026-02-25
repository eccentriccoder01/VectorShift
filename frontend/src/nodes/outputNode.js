// outputNode.js — refactored to use BaseNode

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[{ id: 'value' }]}
      headerColor="#f59e0b"
    >
      <label className="base-node__field">
        <span>Name</span>
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label className="base-node__field">
        <span>Type</span>
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
