import Layout from "@/components/layout";
import Loading from "@/components/loading";
import ProductList from "@/components/product-list";
import { NextPage } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack hasTabBar>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col space-y-5 pb-10 divide-y">
          <ProductList kind="favs" />
        </div>
      </Suspense>
    </Layout>
  );
};

const Page: NextPage = () => {
  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <Loved />
    </SWRConfig>
  );
};

export default Page;
