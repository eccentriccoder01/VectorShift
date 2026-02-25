// textNode.js — refactored to use BaseNode
// Part 3: dynamic resize + variable handles from {{ varName }}

import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';

// Match valid JS identifiers inside {{ }}
// NOTE: regex is created fresh inside useMemo to avoid global lastIndex issues

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((s) => s.updateNodeField);
  const textRef = useRef(null);

  // Compute dynamic dimensions based on content
  const [height, setHeight] = useState(120);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    // Reset height first so scrollHeight shrinks when text is deleted
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    // Only grow the node vertically
    setHeight(Math.max(120, Math.min(el.scrollHeight + 90, 480)));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  // Extract unique variable names for dynamic input handles
  const variables = useMemo(() => {
    // Create the regex fresh each time so lastIndex always starts at 0
    const re = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const seen = new Set();
    const vars = [];
    let m;
    while ((m = re.exec(currText)) !== null) {
      if (!seen.has(m[1])) {
        seen.add(m[1]);
        vars.push(m[1]);
      }
    }
    return vars;
  }, [currText]);

  const dynamicInputs = variables.map((v) => ({ id: v, label: v }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
      headerColor="#10b981"
      style={{ minHeight: height }}
    >
      <label className="base-node__field base-node__field--textarea">
        <span>Text</span>
        <textarea
          ref={textRef}
          value={currText}
          onChange={handleTextChange}
          className="base-node__textarea"
        />
      </label>
      {variables.length > 0 && (
        <div className="base-node__var-tags">
          {variables.map((v) => (
            <span key={v} className="base-node__var-tag">
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
