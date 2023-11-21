import { Metadata } from '../../types/metadata';
import { CSSProperties, useState } from 'react';
import mathUtils from '../../utils/math';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { Html, Line } from '@react-three/drei';

export const DirNode = (args: {
	position: THREE.Vector3;
	index: number;
	meta: Metadata;
	linkPositions: Array<THREE.Vector3>;
}) => {
	const { meta, position, linkPositions, index } = args;

	// defining up here so that it can have the type CSSProperties
	// todo: fix this shit??
	const style: CSSProperties = {
		fontSize: '13px',
		opacity: '0%',
		backgroundColor: 'white',
		border: '1px solid black',
		borderRadius: '4px',
		transition: 'opacity 0.1s ease',
		whiteSpace: 'nowrap',
		position: 'relative',
		left: '1rem',
	};

	const router = useRouter();
	// define state
	const [state, setState] = useState({
		node: {
			radius: 1,
			height: 1.5,
			rotation: new THREE.Euler(
				mathUtils.randomRad(),
				mathUtils.randomRad(),
				mathUtils.randomRad()
			),
			position: new THREE.Vector3().copy(position),
		},
		style: style,
	});
	const linkLines = linkPositions.map((linkPosition) => {
		return (
			<>
				<Line
					points={[
						[linkPosition.x, linkPosition.y, linkPosition.z],
						[position.x, position.y, position.z],
					]}
					key={`${meta.fileName}-to-${linkPosition.x}-${linkPosition.y}-${linkPosition.z}`}
					color={'black'}
				/>
			</>
		);
	});

	return (
		<>
			{/* the actual node thingy*/}
			<mesh
				position={state.node.position}
				rotation={state.node.rotation}
				onClick={() => {
					router.push(`/blog/${meta.fileName}`);
				}}
				onPointerOver={() => {
					setState({
						...state,
						style: { ...state.style, opacity: '100%' },
					});
				}}
				onPointerLeave={() => {
					setState({
						...state,
						style: { ...state.style, opacity: '0%' },
					});
				}}
			>
				{/* this is some HTML to display text when hovered*/}
				<Html style={state.style} center={false}>
					<div className='mono'>{meta.title}</div>
				</Html>

				<coneGeometry
					args={[state.node.radius, state.node.height, 3, 1]}
				/>
				<meshStandardMaterial wireframe={true} color='black' />
			</mesh>
			{/* line to origin */}
			<Line
				points={[
					[0, 0, 0],
					[
						state.node.position.x,
						state.node.position.y,
						state.node.position.z,
					],
				]}
				color={'black'}
			/>
			{/* add in the lines to linked nodes */}
			{linkLines}
		</>
	);
};
