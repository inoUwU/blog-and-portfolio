"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Text3D, Text } from "@react-three/drei";
import type { Mesh } from "three";
import font from "../../public/font/Inter_Bold.json";

type position = [number, number, number];

interface BoxProps {
	position: position;
}

function Box(props: BoxProps): React.JSX.Element {
	// This reference will give us direct access to the mesh
	const meshRef = useRef<Mesh>(null);
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta;
		}
	});

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}

function Text3d({ margin = 0.5 }) {
	return (
		<>
			<Center>
				<Center top left>
					<Text3D font={font}>Hello World</Text3D>
				</Center>
			</Center>
		</>
	);
}
const Main = () => {
	return (
		<Canvas className="w-1/2">
			<ambientLight intensity={Math.PI / 2} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			<Text3d />
		</Canvas>
	);
};
export default Main;
