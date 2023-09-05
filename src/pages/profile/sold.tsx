import Layout from "@/components/layout";
import Loading from "@/components/loading";
import ProductList from "@/components/product-list";
import { NextPage } from "next";
import { Suspense } from "react";
import { SWRConfig } from "swr";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack hasTabBar>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col space-y-5 pb-10 divide-y">
          <ProductList kind="sales" />
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
      <Sold />
    </SWRConfig>
  );
};

export default Page;
