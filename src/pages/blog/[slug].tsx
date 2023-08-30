import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Layout from "@/components/layout";

const PostDetail: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data?.title} canGoBack>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = readdirSync(postsDirectory).map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });

  return {
    paths: files,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx: any) => {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const { content, data } = matter.read(
    `${postsDirectory}/${ctx.params?.slug}.md`
  );
  const { value } = await unified()
    //@ts-ignore
    .use(remarkParse)
    //@ts-ignore
    .use(remarkHtml)
    .process(content);

  return {
    props: {
      post: value,
      data,
    },
  };
};

export default PostDetail;
