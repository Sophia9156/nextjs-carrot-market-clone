import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import useUser from "@/libs/client/useUser";
import Head from "next/head";

export default function Home() {
  const { user, isLoading } = useUser();

  console.log(user);

  return (
    <Layout
      title="홈"
      hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex px-4 flex-col space-y-5 py-10">
        {[...new Array(10)].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="iPhone 14"
            price={99}
            comments={1}
            hearts={1}
          />
        ))}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}
