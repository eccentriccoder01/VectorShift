// BaseNode.js — shared abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';

/**
 * BaseNode renders the chrome that every node shares:
 *   • a coloured header bar with an icon + title
 *   • input handles on the left, output handles on the right
 *   • a content area where each node renders its unique fields
 *
 * Props
 * -----
 * id        – node id (from React Flow)
 * title     – display name shown in the header
 * icon      – emoji / short string rendered before the title
 * inputs    – array of { id, label?, style? }   (target handles)
 * outputs   – array of { id, label?, style? }   (source handles)
 * children  – whatever JSX the concrete node renders
 * style     – optional extra styles for the outer wrapper
 * headerColor – optional colour override for the header bar
 */
const BaseNode = ({
  id,
  title = 'Node',
  icon = '⬡',
  inputs = [],
  outputs = [],
  children,
  style = {},
  headerColor,
}) => {
  return (
    <div className="base-node" style={style}>
      {/* -------- header -------- */}
      <div
        className="base-node__header"
        style={headerColor ? { background: headerColor } : undefined}
      >
        <span className="base-node__icon">{icon}</span>
        <span className="base-node__title">{title}</span>
      </div>

      {/* -------- body -------- */}
      <div className="base-node__body">{children}</div>

      {/* -------- input handles (left) -------- */}
      {inputs.map((h, idx) => {
        const topPercent =
          inputs.length === 1
            ? 50
            : 20 + (idx * 60) / (inputs.length - 1);
        return (
          <Handle
            key={h.id}
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            className="base-node__handle base-node__handle--input"
            style={{ top: `${topPercent}%`, ...h.style }}
          />
        );
      })}

      {/* -------- output handles (right) -------- */}
      {outputs.map((h, idx) => {
        const topPercent =
          outputs.length === 1
            ? 50
            : 20 + (idx * 60) / (outputs.length - 1);
        return (
          <Handle
            key={h.id}
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            className="base-node__handle base-node__handle--output"
            style={{ top: `${topPercent}%`, ...h.style }}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
