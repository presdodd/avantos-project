import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { fetchBlueprintGraph } from '../api/fetchGraph';
 
const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 50, y: 50 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 50, y: 100 } },
];
 
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
 
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 
const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};
 
function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isReady, setIsReady] = useState(false);
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  useEffect(() => {
    async function fetchGraph() {
      try {
        const graph = await fetchBlueprintGraph();
  
        const loadedNodes: Node[] = graph.nodes.map((node: any) => ({
          id: node.id,
          data: { label: node.data?.name || 'Unnamed Node' },
          position: node.position || { x: Math.random() * 300, y: Math.random() * 300 },
          type: 'default', 
        }));
  
        const loadedEdges: Edge[] = graph.edges.map((edge: any, i: number) => ({
          id: `e-${edge.source}-${edge.target}-${i}`,
          source: edge.source,
          target: edge.target,
        }));
  
        setNodes(loadedNodes);
        setEdges(loadedEdges);
        setIsReady(true);
  
      } catch (e) {
        console.error('Failed to load graph:', e);
      }
    }
  
    fetchGraph();
  }, []);
  
 
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      {isReady && (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
      />
      )}
    </div>
  );
}

export default Flow;