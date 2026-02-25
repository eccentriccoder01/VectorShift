// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <span className="toolbar__brand">⬡ VectorShift</span>

      {/* original nodes */}
      <DraggableNode type="customInput" label="Input" icon="📥" />
      <DraggableNode type="llm" label="LLM" icon="🤖" />
      <DraggableNode type="customOutput" label="Output" icon="📤" />
      <DraggableNode type="text" label="Text" icon="📝" />

      {/* 5 new nodes */}
      <DraggableNode type="api" label="API Call" icon="🌐" />
      <DraggableNode type="condition" label="Condition" icon="🔀" />
      <DraggableNode type="timer" label="Timer" icon="⏱️" />
      <DraggableNode type="note" label="Note" icon="📌" />
      <DraggableNode type="math" label="Math" icon="🧮" />
    </div>
  );
};
