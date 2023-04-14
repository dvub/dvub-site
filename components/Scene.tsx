/* eslint-disable react/no-unknown-property */
import { Stats, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Sphere from './Sphere';
import FrameLimiter from "./FrameLimiter";
import { memo } from "react";
import { Metadata } from "../types/metadata";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'


const Scene = (props: {
    metas: Metadata[],
    fps: number,
}) => {

    const { metas, fps } = props;

    return (
        <div>
            <Tooltip id="my-tooltip" />
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
export default memo(Scene);