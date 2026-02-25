// noteNode.js — simple sticky-note / comment node (no handles)

import { useState } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note…');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📌"
      headerColor="#facc15"
    >
      <label className="base-node__field base-node__field--textarea">
        <textarea
          value={note}
          rows={3}
          className="base-node__textarea"
          onChange={(e) => {
            setNote(e.target.value);
            updateNodeField(id, 'note', e.target.value);
          }}
        />
      </label>
    </BaseNode>
  );
};
