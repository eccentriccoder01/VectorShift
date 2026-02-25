// submit.js — Part 4: send pipeline to backend & show results

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setAlert(data);
    } catch (err) {
      console.error(err);
      setAlert({ error: err.message });
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Submit Pipeline
        </button>
      </div>

      {alert && (
        <div className="alert-overlay" onClick={() => setAlert(null)}>
          <div className="alert-card" onClick={(e) => e.stopPropagation()}>
            {alert.error ? (
              <>
                <h2>Error</h2>
                <p style={{ color: '#f87171' }}>{alert.error}</p>
              </>
            ) : (
              <>
                <h2>Pipeline Analysis</h2>
                <div className="alert-stat">
                  <span>Nodes</span>
                  <span>{alert.num_nodes}</span>
                </div>
                <div className="alert-stat">
                  <span>Edges</span>
                  <span>{alert.num_edges}</span>
                </div>
                <div className="alert-stat">
                  <span>Is DAG?</span>
                  <span className={alert.is_dag ? 'dag-yes' : 'dag-no'}>
                    {alert.is_dag ? 'Yes ✓' : 'No ✗'}
                  </span>
                </div>
              </>
            )}
            <button onClick={() => setAlert(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};
