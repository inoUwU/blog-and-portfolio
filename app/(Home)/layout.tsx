import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Fract.Home",
	description: "Hello,I'm Fract.",
};

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
