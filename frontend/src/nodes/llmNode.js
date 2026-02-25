// llmNode.js — refactored to use BaseNode

import BaseNode from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
      headerColor="#8b5cf6"
    >
      <p className="base-node__hint">This is an LLM.</p>
    </BaseNode>
  );
};
