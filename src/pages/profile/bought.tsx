import Layout from "@/components/layout";
import Loading from "@/components/loading";
import ProductList from "@/components/product-list";
import { NextPage } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack hasTabBar>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col space-y-5 pb-10 divide-y">
          <ProductList kind="purchases" />
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
      <Bought />
    </SWRConfig>
  );
};

export default Page;
