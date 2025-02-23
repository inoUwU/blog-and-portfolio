import { Contact, SunMoon } from "lucide-react";
import GithubIcon from "../../public/github.svg";
import XIcon from "../../public/x.svg";
import Image from "next/image";
import Link from "next/link";
import { Itim } from "next/font/google";

const ItimFont = Itim({
	weight: "400",
	subsets: ["latin"],
});

export default function Hero() {
	return (
		<div
			id="side-bar-container"
			className="bg-white h-full text-black flex flex-col"
		>
			<header
				id="sun-moon-container"
				className="flex justify-end p-2"
				style={{ flex: "0 0 10%" }}
			>
				<SunMoon />
			</header>
			<main
				id="side-bar-content"
				className="flex flex-col justify-center p-2"
				style={{ flex: "1 0 90%", marginTop: "-10%" }}
			>
				<p className="flex justify-center gap-4 mb-4">
					<Link href="/blog">
						<Contact />
					</Link>
					<a
						href="https://github.com/inoUwU"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image src={GithubIcon} alt="Github Icon" />
					</a>
					<a
						href="https://x.com/Fract_x"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image src={XIcon} alt="X Icon" />
					</a>
				</p>
				<p className={`text-center ${ItimFont.className}`}>
					Hi There! I'm fract.
				</p>
				<p className={`text-center ${ItimFont.className}`}>
					This site is my blog
				</p>
			</main>
		</div>
	);
}
