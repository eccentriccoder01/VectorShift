// apiNode.js — demonstrates BaseNode with multiple fields

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      inputs={[{ id: 'body' }, { id: 'headers' }]}
      outputs={[{ id: 'response' }]}
      headerColor="#0ea5e9"
    >
      <label className="base-node__field">
        <span>URL</span>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            updateNodeField(id, 'url', e.target.value);
          }}
        />
      </label>
      <label className="base-node__field">
        <span>Method</span>
        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            updateNodeField(id, 'method', e.target.value);
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};
