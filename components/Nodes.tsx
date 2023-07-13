/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import mathUtils from "../utils/math";
import { Metadata } from "../types/metadata";
import { DirNode } from './DirNode';

const Nodes = (props: {
  metas: Metadata[];
}) => {
  // declare variables
  const zero = new THREE.Vector3(0, 0, 0);
  const pointCount = props.metas.length;
  const radius = 20;

  // associate each node's metadata with its position
  const nodeMap = Array.from({length: pointCount}, (x, i) => {
    return {
      position: mathUtils.randomSpherePoint(zero, radius).multiplyScalar(
        mathUtils.randomRange(0.75, 1),
      ),
      meta: props.metas[i],
    };
  });

  // render all of the nodes arranged
  const nodes = Array.from({length: pointCount}, (_, i) => {
    // get the current element from the map above
    const currentData = nodeMap[i];

    // we will create an array for each of the links' associated node positions
    const linkPositions = new Array<THREE.Vector3>();

    // add elements
    currentData.meta.links.forEach(link => {
      nodeMap.forEach(node => {
        if (link === node.meta.fileName) {
          linkPositions.push(node.position);
        }
      })
    })

    return (
      <>
        <DirNode
          key={currentData.meta.fileName}
          position={currentData.position}
          index={i}
          meta={currentData.meta}
          linkPositions={linkPositions}
        />
      </>
    );
  });

  return (
    <group>
      {nodes}
    </group>
  );
};

export default Nodes;
