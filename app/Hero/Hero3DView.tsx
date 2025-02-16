"use client";

import { Canvas } from "@react-three/fiber";
import {
	Center,
	Text3D,
	OrbitControls,
	Environment,
	Grid,
	Line,
} from "@react-three/drei";
import font from "../../public/font/Inter_Bold.json";

const Text3dComponent = ({
	text,
	position,
	rotation,
}: {
	text: string;
	position: [number, number, number];
	rotation: [number, number, number];
}) => {
	return (
		<Text3D
			curveSegments={32}
			bevelEnabled
			bevelSize={0.04}
			bevelThickness={0.1}
			height={0.5}
			lineHeight={0.5}
			letterSpacing={-0.06}
			size={1.5}
			font={font}
			position={position}
			rotation={rotation}
		>
			{text}
			<meshStandardMaterial color="black" />
		</Text3D>
	);
};

const Text3d = () => {
	return (
		<>
			<Center>
				<Center top left>
					<Text3dComponent
						text="HELLO"
						position={[0, 5, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
					/>
					<Text3dComponent
						text="WORLD"
						position={[1, 4, 2]}
						rotation={[-Math.PI / 2, 0, 0]}
					/>
				</Center>
			</Center>
		</>
	);
};

const Main = () => {
	return (
		<Canvas
			shadows
			camera={{ position: [-1, 20, 5], fov: 30, zoom: 1.5 }}
			style={{ background: "#EAECEC" }}
		>
			<group>
				<Center top>
					<Text3d />
				</Center>
				<Line
					points={[
						[-10000, 0, 0],
						[10000, 0, 0],
					]} // 線の始点と終点
					color="red"
					lineWidth={2}
				/>
				<Line
					points={[
						[0, -10000, 0],
						[0, 10000, 0],
					]} // 線の始点と終点
					color="green"
					lineWidth={2}
				/>
				<Grid
					args={[10.5, 10, 5]}
					{...{
						sectionColor: "#000000",
						cellThickness: 0.01,
						fadeDistance: 10,
						cellColor: "#000000",
						centerColor: "#000000",
						size: 0.5,
						divisions: 10,
						infiniteGrid: true,
					}}
				/>
			</group>
			<OrbitControls />
			<Environment preset="studio" />
		</Canvas>
	);
};

export default Main;
