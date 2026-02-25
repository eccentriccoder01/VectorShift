// timerNode.js — delay / scheduler node

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'done' }]}
      headerColor="#f97316"
    >
      <label className="base-node__field">
        <span>Delay (ms)</span>
        <input
          type="number"
          min={0}
          value={delay}
          onChange={(e) => {
            const v = Number(e.target.value);
            setDelay(v);
            updateNodeField(id, 'delay', v);
          }}
        />
      </label>
    </BaseNode>
  );
};
