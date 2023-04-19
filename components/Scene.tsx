/* eslint-disable react/no-unknown-property */
import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Sphere from './Sphere';
import FrameLimiter from "./FrameLimiter";
import { memo } from "react";
import { Metadata } from "../types/metadata";


const Scene = (props: {
    metas: Metadata[],
    fps: number,
}) => {

    const { metas, fps } = props;

    return (
        <div>
            <Canvas
                camera={{ position: [-35, 0, 0] }}
                style={{ height: '25rem' }}
            >
                <Stats/>
                 <OrbitControls />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Sphere metas={metas} />
                <FrameLimiter fps={fps} />
            </Canvas>
        </div>
    );
}
export default Scene;