/* eslint-disable react/no-unknown-property */
import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Sphere from './sphere';
import FrameLimiter from "./FrameLimiter";
import { memo } from "react";
import { Metadata } from "../types/metadata";

const Scene = (props: {
    setPostInfo(meta: Metadata): any,
    metas: Metadata[],
    fps: number,
}) => {

    const { setPostInfo, metas, fps } = props;

    return (
        <Canvas
            camera={{ position: [-35, 0, 0] }}
            style={{ height: '25rem' }}
        >
            <Stats />
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Sphere handleOnPointerOver={setPostInfo} metas={metas} />
            <FrameLimiter fps={fps} />
        </Canvas>
    );
}
export default memo(Scene);