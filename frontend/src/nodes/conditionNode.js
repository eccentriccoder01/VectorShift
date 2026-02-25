// conditionNode.js — if/else branching node

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
      headerColor="#ef4444"
    >
      <label className="base-node__field">
        <span>If</span>
        <input
          type="text"
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
            updateNodeField(id, 'condition', e.target.value);
          }}
        />
      </label>
      <p className="base-node__hint">Outputs: True (top) / False (bottom)</p>
    </BaseNode>
  );
};
