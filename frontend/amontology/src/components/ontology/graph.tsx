import React from "react";
import ReactFlow from "reactflow";
import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";

import useStore, { RFState } from "./store";
import { Box } from "@mui/material";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  // state.
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Graph() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  function onnodeChange(ev: any) {
    console.log("node change", ev);

    onNodesChange(ev);
  }

  function onedgeChange(ev: any) {
    console.log("edge change", v);

    onEdgesChange(ev);
  }

  function onconnect(ev: any) {
    console.log("connect change", ev);

    onConnect(ev);
  }

  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onnodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </Box>
  );
}

export default Graph;
