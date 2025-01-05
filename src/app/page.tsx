"use client";
import { motion } from "framer-motion";

function Greeting() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: 0.5 },
			}}
		>
			<div className="flex items-center text-4xl sm:text-5xl">
				<b className="">Hi there! I&apos;m Fract.</b>👋
			</div>
		</motion.div>
	);
}

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<Greeting />
			</main>
			<footer className="row-start-3 flex flex-col gap-6 items-center justify-center">
				<p>🚧ポートフォリオ兼ブログになる予定です。</p>
				<p>取り敢えず、ここには何もありません。(゜レ゜)</p>
			</footer>
		</div>
	);
}
