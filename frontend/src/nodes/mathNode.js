// mathNode.js — performs a math operation on two inputs

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.op || 'add');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🧮"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
      headerColor="#14b8a6"
    >
      <label className="base-node__field">
        <span>Operation</span>
        <select
          value={op}
          onChange={(e) => {
            setOp(e.target.value);
            updateNodeField(id, 'op', e.target.value);
          }}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
          <option value="power">Power (^)</option>
        </select>
      </label>
    </BaseNode>
  );
};
