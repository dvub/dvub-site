import { Metadata } from "../types/metadata";
import { CSSProperties } from "react";
import mathUtils from "../utils/math";
import * as THREE from "three";
import { useRouter } from "next/router";
import { Html, Line } from "@react-three/drei";

export const DirNode = (args: {
  position: THREE.Vector3;
  index: number;
  meta: Metadata;
  linkPositions: Array<THREE.Vector3>;

}) => {

  const { meta, position, linkPositions } = args;
  const rotation = new THREE.Euler(mathUtils.randomRad(), mathUtils.randomRad(), mathUtils.randomRad());

  const router = useRouter();
  const style: CSSProperties = {
    fontSize: "13px",
    opacity: "0%",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "4px",
    transition: "opacity 0.1s ease",
    whiteSpace: "nowrap",
    position: "relative",
    left: "1rem",
  };
  const linkLines = linkPositions.map(linkPosition => {
    return (<>
      <Line
        points={[
          [
            linkPosition.x,
            linkPosition.y,
            linkPosition.z,
          ],
          [
            position.x,
            position.y,
            position.z,
          ],
        ]}
        key={`${meta.fileName}to${linkPosition.x}${linkPosition.y}${linkPosition.z}`}
        matrixWorldAutoUpdate={undefined}
        getObjectsByProperty={undefined}
        forceSinglePass={undefined}
        getVertexPosition={undefined}
        color={"black"}
      />
    </>
    );
  })


  return (
    <>
      {/* the actual node thingy*/}
      <mesh
        position={position}
        rotation={rotation}

        onClick={() => {
          router.push(`/posts/${meta.fileName}`);
        }}
        onPointerOver={() => {
          style['opacity'] = "100%";
          console.log(position);
        }}
        onPointerLeave={() => {
          style['opacity'] = "0%";
        }}
      >
        {/* this is some HTML to display text when hovered*/}
        <Html
          style={style}
          center={false}
        >
          <div className="mono">{meta.title}</div>
        </Html>

        <coneGeometry args={[1, 1.5, 3, 1]} />
        <meshStandardMaterial wireframe={true} color="black" />
      </mesh>
      {/* line to origin */}
      <Line
        points={[[0, 0, 0], [position.x, position.y, position.z]]}
        matrixWorldAutoUpdate={undefined}
        getObjectsByProperty={undefined}
        forceSinglePass={undefined}
        getVertexPosition={undefined}
        color={"black"}
      />
      {/* add in the lines to linked nodes */}
      <group>
        {linkLines}
      </group>
    </>
  );
};
