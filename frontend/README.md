Here's the complete script. Follow it in order — total runtime should be **4–6 minutes**.

---

## Setup before you hit record

- Have **VS Code** open with the `nodes/` folder visible in the sidebar
- Have **Chrome** open at `http://localhost:3000`
- Have **two terminal tabs** visible (or split): one running the React server, one running uvicorn
- Clear the canvas (refresh the page) so you start clean

---

## Part 1 — Node Abstraction (~90 seconds)

**In VS Code:**

1. Open `nodes/BaseNode.js` — say:
   > *"Every node in the app is built on this single `BaseNode` component. It handles the coloured header, the body layout, and automatically places input and output handles on the left and right sides based on a simple array config — no duplicated React Flow handle code anywhere."*

2. Open llmNode.js — say:
   > *"Here's the LLM node. The entire file is about 15 lines. I just pass a title, an icon, an inputs array and an outputs array to `BaseNode` — that's all it takes to create a fully functional, styled node."*

3. Open `nodes/conditionNode.js` — say:
   > *"And here's one of five new nodes I added to demonstrate the abstraction. The Condition node has one input and two outputs — true and false branches. Again, just config passed into `BaseNode`."*

**Switch to the browser:**

4. One by one, **drag all 9 chips** from the toolbar onto the canvas — Input, LLM, Output, Text, API Call, Condition, Timer, Note, Math. Spread them out so all are visible. Say:
   > *"All nine node types — the original four plus five new ones — are on the canvas. Each was built using the same abstraction."*

---

## Part 2 — Styling (~30 seconds)

**Stay on the browser:**

5. **Scroll/zoom** on the canvas to show the dark slate design. Say:
   > *"The UI uses a consistent dark theme — indigo accent colours, coloured header bars per node type, styled handles that highlight on hover."*

6. **Hover slowly** over a node to show the glow, then hover over a handle to show it enlarges. Say:
   > *"Hover states on nodes and handles give clear visual feedback."*

7. Point out the **minimap** bottom-right — say:
   > *"The minimap uses matching colours so it's actually readable against the dark background."*

---

## Part 3 — Text Node Logic (~90 seconds)

**Clear the canvas first** (refresh) then drop a single **Text** node.

8. Click into the textarea. Start typing a short sentence, e.g.:
   `Hello, this is a test of the auto-resizing text node.`
   
   Say:
   > *"As I type, the node grows taller to fit the content — no scrollbar, no clipping."*

9. **Erase everything** back to empty — show it shrinks back down.

10. Now type:
    `Please summarize {{topic}} in {{language}}`
    
    Pause after `{{topic}}` — show the first handle appear on the left. Say:
    > *"When I type a valid JavaScript variable name inside double curly brackets, a new input handle is created on the left side of the node in real time."*
    
    Finish typing `{{language}}` — show the second handle appear. Say:
    > *"Each unique variable gets its own handle. These can be connected to other nodes just like any normal input."*

11. Delete `{{language}}` from the text — show that handle disappear. Say:
    > *"And if I remove the variable, the handle is automatically removed too."*

---

## Part 4 — Backend Integration, DAG demo (~90 seconds)

**Build a clean pipeline:**

12. Refresh to clear, then build this specific pipeline:
    - Drop **Input**, **Text** (type `{{value}}`), **LLM**, **Output**
    - Connect: **Input right handle → Text `value` handle**
    - Connect: **Text right handle → LLM `prompt` handle**
    - Connect: **LLM `response` handle → Output left handle**

    Say:
    > *"I've built a simple four-node pipeline — Input feeds into a Text template, which feeds into an LLM, whose response goes to Output."*

13. Click **Submit Pipeline**. The modal appears. Say:
    > *"Clicking Submit sends the nodes and edges to the FastAPI backend. The backend counts them and runs a topological sort to check whether the graph is a DAG."*
    
    Show the modal: `Nodes: 4, Edges: 3, Is DAG: Yes ✓`. Say:
    > *"Four nodes, three edges, and it correctly identifies this as a directed acyclic graph."*

14. Close the modal. Now **demonstrate a cycle**:
    - Drop two fresh **Text** nodes
    - In Text A, type `{{loop}}`
    - In Text B, type `{{loop}}`
    - Connect **Text A's right handle → Text B's `loop` handle**
    - Connect **Text B's right handle → Text A's `loop` handle**
    
    Say:
    > *"Now I'll create a cycle by connecting two Text nodes back to each other."*

15. Click **Submit Pipeline**. Show the modal: `Is DAG: No ✗`. Say:
    > *"The backend correctly detects the cycle and reports that this is not a DAG."*

---

## Closing shot (~10 seconds)

**Split-screen if possible** — browser on the left, the uvicorn terminal on the right showing the request logs. Say:
> *"The frontend and backend are fully integrated — every Submit call hits the FastAPI endpoint, and the response is displayed in a user-friendly modal."*

---

That's the complete recording. The most important moments to linger on are: the handle appearing live as you type `{{variable}}`, the node growing as you type, and the DAG `Yes → No` flip on the cycle demo — those are the three things that show real implementation depth.