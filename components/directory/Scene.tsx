/* eslint-disable react/no-unknown-property */
import { Stats, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Nodes from './Nodes';
import FrameLimiter from './FrameLimiter';
import { Metadata } from '../../types/metadata';

const Scene = (props: { metas: Metadata[]; fps: number }) => {
	const { metas, fps } = props;

	return (
		<div>
			<Canvas
				camera={{ position: [-35, 0, 0] }}
				style={{ height: '25rem' }}
			>
				<OrbitControls
					keys={{
						LEFT: 'ArrowLeft',
						RIGHT: 'ArrowRight',
						BOTTOM: 'ArrowDown',
						UP: 'ArrowUp',
					}}
				/>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Nodes metas={metas} />
				<FrameLimiter fps={fps} />
			</Canvas>
		</div>
	);
};
export default Scene;
