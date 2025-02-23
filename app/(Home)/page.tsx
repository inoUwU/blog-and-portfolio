"use client";

import Hero3DView from "./Hero3DView";
import HeroSideBar from "./HeroSideBar";

export default function Home() {
	return (
		<div className="flex flex-col md:flex-row h-svh w-svw">
			<div className="w-svw md:w-5/6">
				<Hero3DView />
			</div>
			<div className="w-svw md:w-1/6 h-full">
				<HeroSideBar />
			</div>
		</div>
	);
}
