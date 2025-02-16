import type { GetStaticProps } from "next";
import Link from "next/link";

interface Post {
	slug: string;
	title: string;
	date: string;
}

interface BlogProps {
	posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
	return (
		<div>
			<h1>Blog</h1>
			{/* <ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blog/${post.slug}`}>
						</Link>
						<p>{post.date}</p>
					</li>
				))}
			</ul> */}
		</div>
	);
};

export default Blog;
