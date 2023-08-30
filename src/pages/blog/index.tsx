import Layout from "@/components/layout";
import matter from "gray-matter";
import { readFileSync, readdirSync } from "fs";
import { GetStaticProps, NextPage } from "next";
import path from "path";
import Link from "next/link";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="게시글">
      <h1 className="font-semibold text-center text-xl mt-5 mb-10">
        Latest Posts:
      </h1>
      <ul>
        {posts?.map((post, key) => (
          <li key={key} className="mb-5">
            <Link href={`/blog/${post.slug}`}>
              <span className="text-lg text-red-500">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const blogPosts = readdirSync(postsDirectory).map((file) => {
    const content = readFileSync(`${postsDirectory}/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
};

export default Blog;
